import { useCallback, useEffect, useRef, useState } from "react";
import SiteFooter from "./components/SiteFooter";
import SiteHeader, { type NavSection } from "./components/SiteHeader";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

const getCurrentPage = (): "home" | "products" =>
  window.location.hash.startsWith("#/produtos") ? "products" : "home";

const getInitialNav = (): NavSection => {
  const hash = window.location.hash;
  if (hash.startsWith("#/produtos")) return "products";
  if (hash === "#parcerias") return "parcerias";
  return "inicio";
};

function App() {
  const [page, setPage] = useState<"home" | "products">(getCurrentPage);
  const [activeNav, setActiveNav] = useState<NavSection>(getInitialNav);
  const scrollLockUntilRef = useRef(0);

  const handleSelectNav = useCallback((target: NavSection) => {
    if (target === "products") {
      scrollLockUntilRef.current = 0;
      setActiveNav("products");
      setPage("products");
      if (window.location.hash !== "#/produtos") {
        window.history.pushState(null, "", "#/produtos");
      }
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (target === "parcerias") {
      scrollLockUntilRef.current = Date.now() + 900;
      setActiveNav("parcerias");
      setPage("home");
      if (window.location.hash !== "#parcerias") {
        window.history.pushState(null, "", "#parcerias");
      }
      requestAnimationFrame(() => {
        const el = document.getElementById("parcerias");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
      return;
    }

    // target === "inicio"
    scrollLockUntilRef.current = Date.now() + 800;
    setActiveNav("inicio");
    setPage("home");
    if (window.location.hash !== "#inicio") {
      window.history.pushState(null, "", "#inicio");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleHashOrPopState = () => {
      const hash = window.location.hash;
      const nextPage = getCurrentPage();

      if (nextPage === "products") {
        setPage("products");
        setActiveNav("products");
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      setPage("home");
      if (hash === "#parcerias") {
        scrollLockUntilRef.current = Date.now() + 900;
        setActiveNav("parcerias");
        requestAnimationFrame(() => {
          document.getElementById("parcerias")?.scrollIntoView({ behavior: "smooth" });
        });
      } else if (hash === "#inicio" || hash === "") {
        scrollLockUntilRef.current = Date.now() + 800;
        setActiveNav("inicio");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashOrPopState);
    window.addEventListener("popstate", handleHashOrPopState);
    return () => {
      window.removeEventListener("hashchange", handleHashOrPopState);
      window.removeEventListener("popstate", handleHashOrPopState);
    };
  }, []);

  useEffect(() => {
    if (page !== "home") return;

    const updateActiveOnScroll = () => {
      if (Date.now() < scrollLockUntilRef.current) return;

      const parceriasEl = document.getElementById("parcerias");
      if (!parceriasEl) return;

      const rect = parceriasEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isParceriasInView =
        rect.top <= viewportHeight * 0.45 && rect.bottom >= 140;

      setActiveNav(isParceriasInView ? "parcerias" : "inicio");
    };

    updateActiveOnScroll();
    window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
    window.addEventListener("resize", updateActiveOnScroll);
    return () => {
      window.removeEventListener("scroll", updateActiveOnScroll);
      window.removeEventListener("resize", updateActiveOnScroll);
    };
  }, [page]);

  return (
    <>
      <SiteHeader activeNav={activeNav} onSelectNav={handleSelectNav} />
      {page === "products" ? <ProductsPage /> : <HomePage />}
      <SiteFooter />
    </>
  );
}

export default App;
