export type NavSection = "inicio" | "products" | "parcerias";

interface SiteHeaderProps {
  activeNav: NavSection;
  onSelectNav: (section: NavSection) => void;
}

function SiteHeader({ activeNav, onSelectNav }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a
          className="site-brand"
          href="#inicio"
          aria-label="Ir para o início"
          onClick={(e) => {
            e.preventDefault();
            onSelectNav("inicio");
          }}
        >
          Betão <span>Fight</span>
        </a>

        <nav className="site-nav" aria-label="Navegação principal">
          <a
            className={activeNav === "inicio" ? "is-active" : ""}
            href="#inicio"
            aria-current={activeNav === "inicio" ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              onSelectNav("inicio");
            }}
          >
            Início
          </a>
          <a
            className={activeNav === "products" ? "is-active" : ""}
            href="#/produtos"
            aria-current={activeNav === "products" ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              onSelectNav("products");
            }}
          >
            Produtos
          </a>
          <a
            className={activeNav === "parcerias" ? "is-active" : ""}
            href="#parcerias"
            aria-current={activeNav === "parcerias" ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              onSelectNav("parcerias");
            }}
          >
            Parcerias
          </a>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
