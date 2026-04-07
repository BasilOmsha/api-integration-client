import { Link } from 'react-router-dom'
import ThemeSwitch from '../components/theme-switch'

export default function Home() {
    const sources = [
        { name: 'Fingrid', description: 'Energy & power grid data', available: true },
        {
            name: 'Statistics Finland',
            description: 'Population & demographic data',
            available: false
        },
        { name: 'City of Helsinki', description: 'Traffic & urban open data', available: false },
        { name: 'Kaggle', description: 'Community datasets & ML data', available: false }
    ]

    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            {/* Nav */}
            <nav className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🇫🇮</span>
                        <span className="font-semibold text-sm">Finnish Open Data</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeSwitch />
                        <Link
                            to="/dashboard"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm rounded-md px-3 py-1.5 sm:px-4 sm:py-2 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center gap-5 sm:gap-6">
                <div className="flex items-center gap-2 bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full border">
                    <span className="size-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                    Live data from Fingrid Open API
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight max-w-2xl leading-tight">
                    Finnish Open Data <span className="text-primary">Dashboard</span>
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg max-w-md sm:max-w-xl">
                    Visualize and explore Finnish open datasets in one place. Starting with Fingrid
                    energy data. More sources coming soon.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
                    <Link
                        to="/dashboard"
                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2.5 font-medium transition-colors text-center"
                    >
                        Open Dashboard
                    </Link>
                    <a
                        href="https://data.fingrid.fi"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                    >
                        About Fingrid API
                    </a>
                </div>
            </main>

            {/* Data sources */}
            <section className="border-t px-4 sm:px-6 lg:px-8 py-10">
                <p className="text-center text-xs text-muted-foreground mb-6 uppercase tracking-widest">
                    Available Data Sources
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
                    {sources.map((source) => (
                        <div
                            key={source.name}
                            className="flex flex-col gap-1 border rounded-lg px-5 py-4 bg-card"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className={`size-2 rounded-full shrink-0 ${source.available ? 'bg-green-500' : 'bg-muted-foreground/30'}`}
                                />
                                <span className="font-medium text-sm">{source.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {source.description}
                            </span>
                            {!source.available && (
                                <span className="text-xs text-muted-foreground/60 mt-1">
                                    Coming soon
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <footer className="border-t px-4 sm:px-6 py-4 text-center text-xs text-muted-foreground">
                Basil Omsha • {new Date().getFullYear()}
            </footer>
        </div>
    )
}
