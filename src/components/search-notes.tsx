export function SearchNotes() {
    return (
        <form className="w-full">
            <input 
            type="text"
            placeholder="Busque em suas notas..."
            className="w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-gray-400"
            />
      </form>
    )
}