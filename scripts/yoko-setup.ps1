# Setup de Work Service en Yoko AI
# 1. Registra la organizacion (slug: work-service) + usuario admin
# 2. Carga la informacion del sitio al vector store (RAG)
# 3. Asigna la personalidad del agente (aiPersona)
#
# Uso:
#   powershell -File scripts\yoko-setup.ps1
#
# Requisitos: backend Yoko corriendo en $ApiBase y la BD docker levantada.

param(
  [string]$ApiBase = "http://localhost:8080/api",
  [string]$AdminEmail = "admin@workservice.com",
  [string]$AdminPassword = "WorkService2026!",
  [string]$AdminName = "Work Service Admin",
  [string]$SuperAdminUser = "yokoadmin",
  [string]$SuperAdminPassword = $(Read-Host "Super admin password (SUPER_ADMIN_PASSWORD)")
)

$ErrorActionPreference = "Stop"

function PostJson($Path, $Body, $Token) {
  $headers = @{}
  if ($Token) { $headers["Authorization"] = "Bearer $Token" }
  Invoke-RestMethod -Uri "$ApiBase$Path" -Method Post -ContentType "application/json; charset=utf-8" -Headers $headers -Body $Body
}

# ─── 1. Registrar organizacion (idempotente) ─────────────────────────────────
Write-Host "`n[1/4] Registrando organizacion Work Service..." -ForegroundColor Cyan
$orgBody = @{
  organizationName = "Work Service"
  sector           = "CORPORATIVO"
  adminName        = $AdminName
  adminEmail       = $AdminEmail
  adminPassword    = $AdminPassword
} | ConvertTo-Json

try {
  PostJson "/auth/register-organization" $orgBody $null | Out-Null
  Write-Host "  Organizacion creada. Admin: $AdminEmail" -ForegroundColor Green
} catch {
  Write-Host "  Ya existe o fallo el registro (continuando): $($_.Exception.Message)" -ForegroundColor Yellow
}

# ─── 2. Login admin ──────────────────────────────────────────────────────────
Write-Host "`n[2/4] Iniciando sesion como admin..." -ForegroundColor Cyan
$loginBody = @{ email = $AdminEmail; password = $AdminPassword } | ConvertTo-Json
$login = PostJson "/auth/login" $loginBody $null
$adminToken = $login.token
Write-Host "  Token obtenido." -ForegroundColor Green

# ─── 3. Cargar documentos al vector store ────────────────────────────────────
Write-Host "`n[3/4] Cargando documentos al vector store..." -ForegroundColor Cyan

$docs = @(
  @{
    titulo    = "Espacios y Precios Work Service"
    categoria = "espacios"
    content   = @'
Coworking: espacios abiertos y dinamicos para trabajo colaborativo en Work Service. Capacidad: 1 a 10 personas. Incluye: internet simetrico 500 Mbps, climatizacion individual, acceso a salas de reuniones, cafeteria premium incluida, recepcion y correo. Precios: escritorio flexible $45/dia, escritorio fijo $90/dia, plan mensual $250/mes.
---
Oficinas Privadas: oficinas completamente equipadas para equipos que necesitan privacidad y entorno corporativo de primer nivel. Capacidad: 2 a 20 personas. Incluye: aislamiento acustico, mobiliario ergonomico, videoconferencia 4K, control de acceso 24/7, limpieza incluida. Precios: oficina 2 personas $120/dia, oficina 4 personas $220/dia, oficina 10+ personas desde $450/dia.
---
Estudio de Produccion: estudio insonorizado con equipo profesional para grabar podcasts, videos y contenido digital con calidad de estudio. Capacidad: 1 a 6 personas. Incluye: aislamiento acustico, consola y microfonos, iluminacion para video, pantalla de monitoreo, Wi-Fi de alta velocidad. Precios: por hora $60/hora, media jornada $200, jornada completa $350/dia.
---
Salas de Reuniones: salas profesionales con tecnologia AV de ultima generacion para presentaciones, entrevistas y videollamadas. Capacidad: 4 a 20 personas. Incluye: pantalla interactiva 75", audio profesional, pizarra digital, videoconferencia integrada, catering opcional. Precios: sala estandar $150/hora, sala ejecutiva $250/hora, dia completo $800.
---
Salones de Eventos: espacios versatiles para conferencias, talleres y eventos corporativos con grandes audiencias. Capacidad: 50 a 500 personas. Incluye: escenario y tarima, sistema de sonido profesional, iluminacion escenica, catering completo, equipo de produccion. Precios: por evento $500 a $2,000, con catering desde $1,500.
---
Aulas y Cursos: aulas equipadas para cursos, talleres y capacitaciones. Capacidad: 15 a 25 personas. Incluye: pizarra y proyector, mesas modulares configurables, Wi-Fi de alta velocidad, soporte tecnico en sitio. Precios: por dia $850/dia, paquete semanal $3,500.
'@
  },
  @{
    titulo    = "Sobre Work Service"
    categoria = "empresa"
    content   = @'
Work Service es la plataforma premium de renta de espacios corporativos en Maracaibo, Venezuela. Estamos ubicados en la Torre Banco Industrial, en el corazon de la ciudad. Ofrecemos oficinas privadas, espacios de coworking, talleres y areas creativas: cada detalle disenado para que trabajes, colabores y crezcas. Stats: mas de 50 espacios premium, mas de 1,000 clientes corporativos, 100% de satisfaccion del cliente.
'@
  },
  @{
    titulo    = "Reservas Work Service"
    categoria = "reservas"
    content   = @'
Como reservar en Work Service: usa el boton "Reservar Ahora" de la web y sigue el flujo de 3 pasos: selecciona el tipo de espacio, elige fecha y hora, y confirma. Horarios disponibles: 09:00, 11:00, 14:00 y 16:00. Duraciones: 1 hora, 2 horas, 4 horas o dia completo. Beneficios: confirmacion instantanenea en ~30 segundos, cancelacion flexible y soporte 24/7. Los precios incluyen un cargo de servicio del 10% (ejemplo: sala estandar $150/hora + $15 de servicio = $165 total).
'@
  }
)

foreach ($doc in $docs) {
  $docBody = @{
    titulo      = $doc.titulo
    categoria   = $doc.categoria
    subcategoria = "web"
    content     = $doc.content
  } | ConvertTo-Json
  PostJson "/admin/load-data" $docBody $adminToken | Out-Null
  Write-Host "  Cargado: $($doc.titulo)" -ForegroundColor Green
}

# ─── 4. Asignar personalidad (requiere super admin) ──────────────────────────
Write-Host "`n[4/4] Asignando personalidad del agente (Vega)..." -ForegroundColor Cyan
$saBody = @{ username = $SuperAdminUser; password = $SuperAdminPassword } | ConvertTo-Json
$saLogin = PostJson "/super/login" $saBody $null
$saToken = $saLogin.token

$orgs = Invoke-RestMethod -Uri "$ApiBase/super/organizations?page=0&size=100" -Method Get -Headers @{ Authorization = "Bearer $saToken" }
$org = $orgs.content | Where-Object { $_.slug -eq "work-service" } | Select-Object -First 1
if (-not $org) { throw "No se encontro la organizacion con slug 'work-service'" }

$persona = @'
Eres Vega, el concierge virtual de Work Service, la plataforma premium de renta de espacios corporativos en la Torre Banco Industrial, Maracaibo. Atiendes a clientes corporativos como el concierge de un hotel cinco estrellas: profesional, cordial y eficiente. Saludas con cortesia, respondes con precision y guias al cliente hacia el espacio ideal para su necesidad (coworking, oficinas privadas, estudio de produccion, salas de reuniones, salones de eventos o aulas). Cuando el cliente muestre interes en reservar, invitalo con elegancia a usar el boton "Reservar Ahora" de la web o a escribir por WhatsApp. Manten las respuestas breves, claras y orientadas a la accion. Si preguntan por algo fuera de tu informacion disponible, disculpate con elegancia y sugiere contactar al equipo humano por WhatsApp.
'@

Invoke-RestMethod -Uri "$ApiBase/super/organizations/$($org.id)/persona" -Method Patch -ContentType "text/plain; charset=utf-8" -Headers @{ Authorization = "Bearer $saToken" } -Body $persona | Out-Null
Write-Host "  Persona 'Vega' asignada a la organizacion ($($org.id))." -ForegroundColor Green

Write-Host "`nListo. El widget usa el slug 'work-service' y el agente ya tiene identidad y datos." -ForegroundColor Cyan
