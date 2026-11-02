const REDES = [
  ['https://www.facebook.com/share/1FxydzkPb6/?mibextid=wwXIfr', '📘 Facebook'],
  ['https://www.tiktok.com/@aprendocontigo.ac?_r=1&_t=ZS-97Iwtmz5ueF', '🎵 TikTok'],
  ['https://www.instagram.com/aprendocontigo.ac?igsh=MWV2aHJvcGY5dm1oeQ%3D%3D&utm_source=qr', '📷 Instagram'],
  ['https://www.linkedin.com/in/sharon-andrea-mantilla-urzola-1b4b93385?utm_source=share_via&utm_content=profile&utm_medium=member_ios', '💼 LinkedIn'],
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-marca">
        <img src="/imagenes/logo.png" alt="Logo de Aprendo Contigo" />
        <h2>📚 Aprendo Contigo</h2>
        <p>
          Fortaleciendo aprendizajes, creando confianza y acompañando cada proceso
          educativo.
        </p>
      </div>

      <div className="footer-redes">
        <h3>Síguenos en nuestras redes</h3>
        {REDES.map(([href, label]) => (
          <a key={href} href={href} target="_blank" rel="noreferrer">
            {label}
          </a>
        ))}
      </div>

      <div className="derechos">
        <p>© 2026 Aprendo Contigo</p>
        <p>Barranquilla, Colombia</p>
        <p>Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
