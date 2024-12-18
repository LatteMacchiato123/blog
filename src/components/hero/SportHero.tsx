export function SportHero() {
    return (
      <div>
        <div
          className="hero min-h-96 mt-12"
          style={{
            backgroundImage:
              "url('/assets/sport-hero.jpg')",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content">
            <div className="max-w-screen-2xl mx-auto">
              <h1 className="mb-5 text-5xl font-bold upercase">Fuel Your Passion, Play with Purpose.</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  