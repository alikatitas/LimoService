import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Contact() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [captchaResolved, setCaptchaResolved] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const toggleMode = () => setIsDarkMode(!isDarkMode);

    const submit = (e) => {
        e.preventDefault();
        if (!captchaResolved) {
            alert("Lütfen robot olmadığınızı doğrulayın.");
            return;
        }
        post('/contact-submit', {
            onSuccess: () => {
                alert("Mesajınız başarıyla gönderildi!");
                reset();
                setCaptchaResolved(false);
            }
        });
    };

    return (
        <div className={`${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} min-h-screen transition-colors duration-700 font-sans selection:bg-blue-600`}>
            <Head title="Contact Us | Canada's Elite Transport" />

            {/* Navigation */}
            <nav className={`fixed w-full z-[100] border-b transition-all duration-500 ${isDarkMode ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">C</div>
                        <span className="font-black tracking-tighter text-2xl uppercase italic">Canada<span className="text-blue-600">Limo</span></span>
                    </Link>
                    <button onClick={toggleMode} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'}`}>
                        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>
            </nav>

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                    
                    {/* Sol Taraf: İletişim Bilgileri */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-blue-500 text-[11px] font-black uppercase tracking-[0.5em] mb-4 text-left">Get In Touch</h2>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none mb-8 text-left">Connect With <br /> <span className="text-blue-600">Our VIP Team.</span></h1>
                            <p className="opacity-60 font-medium max-w-md text-left leading-relaxed">Have a special request or need to discuss corporate partnership? Our 24/7 concierge team is ready to assist you.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-10 text-left">
                            <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">Call Center</p>
                                <a href="tel:+16470000000" className="text-xl font-black hover:text-blue-600 transition tracking-tighter italic">+1 (647) 000-0000</a>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">Email Support</p>
                                <a href="mailto:info@canadalimo.com" className="text-xl font-black hover:text-blue-600 transition tracking-tighter italic">info@canadalimo.com</a>
                            </div>
                            <div className="space-y-3 col-span-full">
                                <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">Headquarters</p>
                                <p className="text-lg font-bold leading-snug">Toronto Pearson International Airport,<br />Terminal 1, Ontario, Canada</p>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Taraf: İletişim Formu */}
                    <div className={`p-10 md:p-16 rounded-[4rem] border transition-all duration-500 shadow-2xl ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                        <form onSubmit={submit} className="space-y-6 text-left">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Full Name *</label>
                                <input 
                                    type="text" required
                                    className={`w-full p-5 rounded-2xl border-none font-bold focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
                                    onChange={e => setData('name', e.target.value)} value={data.name}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Email *</label>
                                    <input 
                                        type="email" required
                                        className={`w-full p-5 rounded-2xl border-none font-bold focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
                                        onChange={e => setData('email', e.target.value)} value={data.email}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Phone *</label>
                                    <input 
                                        type="tel" required
                                        className={`w-full p-5 rounded-2xl border-none font-bold focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
                                        onChange={e => setData('phone', e.target.value)} value={data.phone}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Message *</label>
                                <textarea 
                                    rows="4" required
                                    className={`w-full p-5 rounded-2xl border-none font-bold focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
                                    onChange={e => setData('message', e.target.value)} value={data.message}
                                ></textarea>
                            </div>

                            {/* Ben Robot Değilim Doğrulaması (Custom Component) */}
                            <div className={`p-4 rounded-2xl border flex items-center gap-4 ${isDarkMode ? 'bg-slate-950/50 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                <input 
                                    type="checkbox" 
                                    id="captcha" 
                                    className="w-6 h-6 rounded border-none bg-blue-600 focus:ring-0 cursor-pointer"
                                    onChange={e => setCaptchaResolved(e.target.checked)}
                                />
                                <label htmlFor="captcha" className="text-xs font-black uppercase tracking-widest cursor-pointer opacity-70">I am not a robot</label>
                                <div className="ml-auto opacity-20 italic font-black text-[10px]">CAPTCHA</div>
                            </div>

                            <button 
                                type="submit" disabled={processing}
                                className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black tracking-[0.3em] uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-xs"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className={`py-12 text-center border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200 opacity-40'}`}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">© 2026 Canada Premium Limo Services</p>
            </footer>
        </div>
    );
}