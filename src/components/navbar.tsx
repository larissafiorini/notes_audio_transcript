import logo from "../assets/bloco-de-anotacoes.svg";

export function Navbar() {
    return (
        <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

        <div className="relative flex h-16 items-center gap-3">
          <img src={logo} className="h-9 w-auto "/>
          <span className="text-slate-50 font-sans h-auto lg:px-2 font-semibold text-xl">Expert Notes</span>
        </div>
        </div>
      </nav>
    )
}