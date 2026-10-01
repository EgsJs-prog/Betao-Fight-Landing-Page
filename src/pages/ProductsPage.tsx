import { useState } from "react";
import ProductIcon from "../components/ProductIcon";
import {
  PRODUCTS,
  KITS,
  KIT_PRICE,
  KIT_DESCRIPTION,
  GLOVE_KITS,
  GLOVE_KIT_PRICE,
  GLOVE_KIT_DESCRIPTION,
  CORE_KITS,
  CORE_KIT_PRICE,
  CORE_KIT_DESCRIPTION,
  productWhatsAppLink,
  WHATSAPP_LINK,
} from "../data";

const base = import.meta.env.BASE_URL;
const asset = (src: string) => base + src.replace(/^\//, "");

function ProductsPage() {
  const [activeKit, setActiveKit] = useState(0);
  const [activeGloveKit, setActiveGloveKit] = useState(0);
  const [activeCoreKit, setActiveCoreKit] = useState(0);
  const currentKit = KITS[activeKit];
  const currentGloveKit = GLOVE_KITS[activeGloveKit];
  const currentCoreKit = CORE_KITS[activeCoreKit];

  return (
    <main className="products-page" id="produtos">
      <section className="products-hero">
        <div className="container products-hero__inner">
          <div>
            <span className="eyebrow">Betão Fight Store</span>
            <h1>Produtos para quem vive o treino</h1>
            <p>
              Vestuário, equipamentos e acessórios para Boxe, Kickboxing e rotina de treino.
            </p>
          </div>

          <a className="button button--ghost" href="#inicio">
            Voltar para a academia
          </a>
        </div>
      </section>

      {/* ── Kit Carousel ── */}
      <section className="section kit-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Coleção Betão Fight</span>
              <h2>Kits Camiseta + Shorts</h2>
            </div>
            <p className="kit-section__price">
              <strong>{KIT_PRICE}</strong>
              <span>o Kit</span>
            </p>
          </div>

          <div className="kit-carousel">
            <div
              className="kit-carousel__viewport"
              style={{
                "--accent": currentKit.accentColor,
              } as React.CSSProperties}
            >
              <div
                className="kit-carousel__track"
                style={{ transform: `translateX(-${activeKit * 100}%)` }}
              >
                {KITS.map((kit) => (
                  <div className="kit-carousel__slide" key={kit.id}>
                    <img
                      src={asset(kit.image)}
                      alt={`${kit.name} — Camiseta e Shorts`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Nav arrows */}
              <button
                type="button"
                className="kit-carousel__arrow kit-carousel__arrow--prev"
                aria-label="Kit anterior"
                onClick={() =>
                  setActiveKit((prev) => (prev === 0 ? KITS.length - 1 : prev - 1))
                }
              >
                ‹
              </button>
              <button
                type="button"
                className="kit-carousel__arrow kit-carousel__arrow--next"
                aria-label="Próximo kit"
                onClick={() =>
                  setActiveKit((prev) => (prev === KITS.length - 1 ? 0 : prev + 1))
                }
              >
                ›
              </button>
            </div>

            {/* Info below carousel */}
            <div className="kit-carousel__info">
              <span className="kit-carousel__model" style={{ color: currentKit.accentColor }}>
                Modelo
              </span>
              <h3 className="kit-carousel__name">{currentKit.model}</h3>
              <p className="kit-carousel__desc">{KIT_DESCRIPTION}</p>

              {/* Dots */}
              <div className="kit-carousel__dots">
                {KITS.map((kit, index) => (
                  <button
                    type="button"
                    key={kit.id}
                    className={`kit-carousel__dot${index === activeKit ? " kit-carousel__dot--active" : ""}`}
                    style={{
                      "--dot-color": kit.accentColor,
                    } as React.CSSProperties}
                    aria-label={`Ver ${kit.model}`}
                    onClick={() => setActiveKit(index)}
                  />
                ))}
              </div>

              <a
                className="button button--primary"
                href={productWhatsAppLink(currentKit.name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero esse kit →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Glove Kit Carousel ── */}
      <section className="section glove-kit-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Pretorian Strike</span>
              <h2>Kit Luva + Bandagem + Protetor Bucal</h2>
            </div>
            <p className="kit-section__price">
              <strong>{GLOVE_KIT_PRICE}</strong>
              <span>o Kit</span>
            </p>
          </div>

          <div className="kit-carousel">
            <div
              className="kit-carousel__viewport kit-carousel__viewport--glove"
              style={{
                "--accent": currentGloveKit.accentColor,
              } as React.CSSProperties}
            >
              <div
                className="kit-carousel__track"
                style={{ transform: `translateX(-${activeGloveKit * 100}%)` }}
              >
                {GLOVE_KITS.map((kit) => (
                  <div className="kit-carousel__slide" key={kit.id}>
                    <img
                      src={asset(kit.image)}
                      alt={`Kit Luva, Bandagem e Protetor Bucal — ${kit.color}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="kit-carousel__arrow kit-carousel__arrow--prev"
                aria-label="Kit anterior"
                onClick={() =>
                  setActiveGloveKit((prev) => (prev === 0 ? GLOVE_KITS.length - 1 : prev - 1))
                }
              >
                ‹
              </button>
              <button
                type="button"
                className="kit-carousel__arrow kit-carousel__arrow--next"
                aria-label="Próximo kit"
                onClick={() =>
                  setActiveGloveKit((prev) => (prev === GLOVE_KITS.length - 1 ? 0 : prev + 1))
                }
              >
                ›
              </button>
            </div>

            <div className="kit-carousel__info">
              <span className="kit-carousel__model" style={{ color: currentGloveKit.accentColor }}>
                Cor
              </span>
              <h3 className="kit-carousel__name">{currentGloveKit.color}</h3>
              <p className="kit-carousel__desc">{GLOVE_KIT_DESCRIPTION}</p>

              <div className="kit-carousel__dots">
                {GLOVE_KITS.map((kit, index) => (
                  <button
                    type="button"
                    key={kit.id}
                    className={`kit-carousel__dot${index === activeGloveKit ? " kit-carousel__dot--active" : ""}`}
                    style={{
                      "--dot-color": kit.accentColor,
                    } as React.CSSProperties}
                    aria-label={`Ver ${kit.color}`}
                    onClick={() => setActiveGloveKit(index)}
                  />
                ))}
              </div>

              <a
                className="button button--primary"
                href={productWhatsAppLink(`${currentGloveKit.name} (${GLOVE_KIT_PRICE})`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero esse kit →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pretorian Core Carousel ── */}
      <section className="section kit-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Pretorian Core</span>
              <h2>Kit Luva + Bandagem + Protetor Bucal</h2>
            </div>
            <p className="kit-section__price">
              <strong>{CORE_KIT_PRICE}</strong>
              <span>o Kit</span>
            </p>
          </div>

          <div className="kit-carousel">
            <div
              className="kit-carousel__viewport kit-carousel__viewport--glove"
              style={{
                "--accent": currentCoreKit.accentColor,
              } as React.CSSProperties}
            >
              <div
                className="kit-carousel__track"
                style={{ transform: `translateX(-${activeCoreKit * 100}%)` }}
              >
                {CORE_KITS.map((kit) => (
                  <div className="kit-carousel__slide" key={kit.id}>
                    <img
                      src={asset(kit.image)}
                      alt={`Kit Pretorian Core — ${kit.color}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="kit-carousel__arrow kit-carousel__arrow--prev"
                aria-label="Kit anterior"
                onClick={() =>
                  setActiveCoreKit((prev) => (prev === 0 ? CORE_KITS.length - 1 : prev - 1))
                }
              >
                ‹
              </button>
              <button
                type="button"
                className="kit-carousel__arrow kit-carousel__arrow--next"
                aria-label="Próximo kit"
                onClick={() =>
                  setActiveCoreKit((prev) => (prev === CORE_KITS.length - 1 ? 0 : prev + 1))
                }
              >
                ›
              </button>
            </div>

            <div className="kit-carousel__info">
              <span className="kit-carousel__model" style={{ color: currentCoreKit.accentColor }}>
                Cor
              </span>
              <h3 className="kit-carousel__name">{currentCoreKit.color}</h3>
              <p className="kit-carousel__desc">{CORE_KIT_DESCRIPTION}</p>

              <div className="kit-carousel__dots">
                {CORE_KITS.map((kit, index) => (
                  <button
                    type="button"
                    key={kit.id}
                    className={`kit-carousel__dot${index === activeCoreKit ? " kit-carousel__dot--active" : ""}`}
                    style={{
                      "--dot-color": kit.accentColor,
                    } as React.CSSProperties}
                    aria-label={`Ver ${kit.color}`}
                    onClick={() => setActiveCoreKit(index)}
                  />
                ))}
              </div>

              <a
                className="button button--primary"
                href={productWhatsAppLink(`${currentCoreKit.name} (${CORE_KIT_PRICE})`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero esse kit →
              </a>
            </div>
          </div>
        </div>
      </section>


      <section className="products-cta">
        <div className="container products-cta__inner">
          <div>
            <span className="eyebrow">Dúvidas sobre produtos?</span>
            <h2>Fale com a Betão Fight</h2>
            <p>Informe o produto que procura e consulte disponibilidade, tamanhos e valores.</p>
          </div>

          <a className="button button--primary" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
