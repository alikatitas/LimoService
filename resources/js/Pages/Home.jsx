import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Home({ cars }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Hero Slider Mekanizması
    useEffect(() => {
        if (cars && cars.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev === cars.length - 1 ? 0 : prev + 1));
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [cars]);

    const toggleMode = () => setIsDarkMode(!isDarkMode);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Fleet', href: '#fleet' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <div className={`${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} min-h-screen transition-colors duration-700 font-sans selection:bg-blue-600`}>
            <Head title="Canada's Elite Transport | Premium Limo & Chauffeur" />

            {/* 1. TOP CONTACT BAR (Büyük Yazılı) */}
            <div className={`w-full py-3 px-6 transition-colors z-[110] relative shadow-lg ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-black uppercase tracking-widest">
                    <div className="flex gap-8">
                        <a href="tel:+16470000000" className="flex items-center gap-2 hover:scale-105 transition-transform">+1 (647) 000-0000</a>
                        <a href="mailto:booking@canadalimo.com" className="hidden sm:flex items-center gap-2 hover:scale-105 transition-transform lowercase tracking-normal">booking@canadalimo.com</a>
                    </div>
                    <div className="hidden md:block opacity-80 italic italic">24/7 VIP SERVICE</div>
                </div>
            </div>

            {/* 2. NAVIGATION & MOBILE MENU */}
            <nav className={`sticky top-0 w-full z-[120] border-b transition-all duration-500 ${isDarkMode ? 'bg-slate-950/90 border-white/5' : 'bg-white/90 border-slate-200'} backdrop-blur-md`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-xl italic">C</div>
                        <span className="font-black tracking-tighter text-2xl uppercase italic">Canada<span className="text-blue-600">Limo</span></span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 hover:opacity-100 hover:text-blue-600 transition-all">{link.name}</Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleMode} className={`p-2.5 rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}>
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>
                        <Link href="/booking" className={`hidden sm:block px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isDarkMode ? 'bg-white text-slate-950 hover:bg-blue-600 hover:text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}`}>Reserve Now</Link>
                        
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 bg-blue-600 text-white rounded-xl">
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className={`lg:hidden p-8 space-y-6 animate-in slide-in-from-top duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white border-b'}`}>
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-2xl font-black uppercase italic">{link.name}</Link>
                        ))}
                    </div>
                )}
            </nav>

            {/* 3. HERO SLIDER SECTION */}
            <section className="relative h-[calc(100vh-120px)] flex items-center px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
                    <div className="z-10 text-left">
                        <h1 className="text-6xl md:text-[85px] font-black leading-[0.85] tracking-tighter mb-8 uppercase italic">Elite <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Transportation.</span></h1>
                        <p className={`text-lg mb-12 max-w-md font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>The pinnacle of luxury travel. Reliable, discrete, and comfortable service across Canada.</p>
                        <Link href="/booking" className="inline-flex px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black tracking-widest text-xs uppercase shadow-2xl">Start Your Journey</Link>
                    </div>

                    <div className="relative h-[500px] lg:h-[700px] rounded-[4rem] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl">
                        {cars && cars.length > 0 ? cars.map((car, index) => (
                            <div key={car.id} className={`absolute inset-0 transition-all duration-[1500ms] ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                                <img src={car.image ? `/storage/${car.image}` : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80'} className="w-full h-full object-cover brightness-[0.8]" alt={car.model_name} />
                                <div className="absolute top-10 right-10 bg-black/40 backdrop-blur-xl px-6 py-2 rounded-full text-white text-[10px] font-black italic uppercase">{car.model_name}</div>
                            </div>
                        )) : <div className="h-full flex items-center justify-center opacity-30 italic">Fleet loading...</div>}
                    </div>
                </div>
            </section>

            {/* 4. FLEET GRID SECTION */}
            <section id="fleet" className={`py-32 px-6 ${isDarkMode ? 'bg-slate-900/10' : 'bg-slate-200/30'}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-20 text-left">Our Premium Fleet</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {cars && cars.map((car) => (
                            <div key={car.id} className={`group rounded-[3.5rem] overflow-hidden border transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                                <div className="h-72 overflow-hidden relative">
                                    <img src={car.image ? `/storage/${car.image}` : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80'} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={car.model_name} />
                                    <div className="absolute top-6 left-6 bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase">Max {car.capacity} Pax</div>
                                </div>
                                <div className="p-10 text-left">
                                    <h3 className="text-2xl font-black uppercase italic mb-8">{car.model_name}</h3>
                                    <div className="flex justify-between items-end border-t border-white/5 pt-8">
                                        <div>
                                            <p className="text-[10px] font-black opacity-30 uppercase mb-1">From</p>
                                            <p className="text-2xl font-black text-blue-600">${car.base_fare}</p>
                                        </div>
                                        <Link href="/booking" className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase transition-all ${isDarkMode ? 'bg-white text-slate-900 hover:bg-blue-600' : 'bg-slate-900 text-white hover:bg-blue-600'}`}>Book</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <footer className={`py-24 px-8 border-t ${isDarkMode ? 'bg-slate-950 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-left text-sm">
                    <div className="space-y-4">
                        <span className="font-black text-2xl uppercase italic">Canada<span className="text-blue-600">Limo</span></span>
                        <p className="opacity-50 font-medium">Canada's elite chauffeur network for VIP transportation.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-black uppercase text-blue-600">Contact</h4>
                        <p className="font-black text-xl">+1 (647) 000-0000</p>
                        <p className="font-bold">booking@canadalimo.com</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-black uppercase text-blue-600">Headquarters</h4>
                        <p className="opacity-50">YYZ International Airport, Toronto, ON, Canada</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}