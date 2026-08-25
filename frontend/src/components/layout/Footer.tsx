export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-slate-200
        bg-white
        px-5
        py-14
        text-slate-950
        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-slate-950
        dark:text-white

        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Main footer */}

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}

          <div className="md:col-span-2">
            <div className="flex items-center gap-3">

              {/* Logo */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-950
                  font-black
                  text-white

                  dark:bg-white
                  dark:text-slate-950
                "
              >
                B
              </div>

              {/* Brand name */}

              <div
                className="
                  text-xl
                  font-black
                  text-slate-950

                  dark:text-white
                "
              >
                Bota
                <span className="text-orange-500">
                  Felig
                </span>
              </div>
            </div>

            <p
              className="
                mt-5
                max-w-md
                leading-7
                text-slate-500

                dark:text-slate-400
              "
            >
              Ethiopia&apos;s modern marketplace for discovering,
              comparing, and booking billboard advertising spaces.
            </p>
          </div>

          {/* Platform */}

          <div>
            <h3
              className="
                font-bold
                text-slate-950

                dark:text-white
              "
            >
              Platform
            </h3>

            <div
              className="
                mt-5
                flex
                flex-col
                gap-3
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              <a
                href="#explore"
                className="
                  transition
                  hover:text-orange-600

                  dark:hover:text-orange-400
                "
              >
                Explore
              </a>

              <a
                href="#locations"
                className="
                  transition
                  hover:text-orange-600

                  dark:hover:text-orange-400
                "
              >
                Locations
              </a>

              <a
                href="#how-it-works"
                className="
                  transition
                  hover:text-orange-600

                  dark:hover:text-orange-400
                "
              >
                How It Works
              </a>

              <a
                href="#owners"
                className="
                  transition
                  hover:text-orange-600

                  dark:hover:text-orange-400
                "
              >
                For Owners
              </a>
            </div>
          </div>

          {/* Company */}

          <div>
            <h3
              className="
                font-bold
                text-slate-950

                dark:text-white
              "
            >
              Company
            </h3>

            <div
              className="
                mt-5
                flex
                flex-col
                gap-3
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              <a
                href="#"
                className="
                  transition
                  hover:text-orange-600

                  dark:hover:text-orange-400
                "
              >
                About Us
              </a>

              <a
                href="#"
                className="
                  transition
                  hover:text-orange-600

                  dark:hover:text-orange-400
                "
              >
                Contact
              </a>

              <a
                href="#"
                className="
                  transition
                  hover:text-orange-600

                  dark:hover:text-orange-400
                "
              >
                Privacy
              </a>

              <a
                href="#"
                className="
                  transition
                  hover:text-orange-600

                  dark:hover:text-orange-400
                "
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-12
            flex
            flex-col
            justify-between
            gap-4
            border-t
            border-slate-200
            pt-7
            text-sm
            text-slate-400

            dark:border-slate-800
            dark:text-slate-500

            sm:flex-row
          "
        >
          <p>
            © 2026 BotaFelig. All rights reserved.
          </p>

          <p>
            Made for Ethiopia 🇪🇹
          </p>
        </div>
      </div>
    </footer>
  );
}