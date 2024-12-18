export function LifestyleHero() {
    return (
      <div>
        <div
          className="hero min-h-96 mt-12"
          style={{
            backgroundImage:
              "url('/assets/ls-hero.jpg')",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content">
            <div className="max-w-screen-2xl mx-auto">
              <h1 className="mb-5 text-5xl font-bold uppercase">Live Well, Dream Big, Shine Bright </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  