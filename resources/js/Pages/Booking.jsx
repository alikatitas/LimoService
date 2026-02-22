import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Booking({ cars }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [distance, setDistance] = useState(0); 
    const [passengers, setPassengers] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destSuggestions, setDestSuggestions] = useState([]);

    const { data, setData, post, processing, reset } = useForm({
        car_id: '',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        pickup_address: '',
        destination_address: '',
        distance: 0,
        passenger_count: 1,
        total_price: 0,
        pickup_time: '',
        flight_number: '',
        notes: '',
    });

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // Adres Önerileri
    const searchAddress = async (query, type) => {
        if (query.length < 3) return;
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=ca&limit=5`);
            if (type === 'pickup') setPickupSuggestions(response.data);
            else setDestSuggestions(response.data);
        } catch (error) { console.error(error); }
    };

    // Mesafe Değiştiğinde Formu Güncelle
    useEffect(() => {
        if (data.pickup_address && data.destination_address) {
            const simDist = 45; 
            setDistance(simDist);
            setData('distance', simDist);
        }
    }, [data.pickup_address, data.destination_address]);

    // Fiyat Hesaplama
    const getPricing = (car, dist, pax) => {
        const baseFare = parseFloat(car.base_fare || 0);
        const limit = parseInt(car.base_km_limit || 0);
        const rate = parseFloat(car.price_per_km || 0);
        let perPersonPrice = baseFare + (dist > limit ? (dist - limit) * rate : 0);
        return { perPerson: perPersonPrice, total: perPersonPrice * pax };
    };

    const handleOpenModal = (car) => {
        const pricing = getPricing(car, distance, passengers);
        setSelectedCar(car);
        setData({
            ...data,
            car_id: car.id,
            total_price: pricing.total,
            distance: distance,
            passenger_count: passengers
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'), { onSuccess: () => { setIsModalOpen(false); reset(); } });
    };

    return (
        <div className={`min-h-screen transition-colors duration-700 font-sans ${isDarkMode ? 'bg-[#0f172a] text-white' : 'bg-slate-50 text-slate-900'}`}>
            <Head title="Luxury Booking | Canada Limo" />

            {/* Navigation */}
            <nav className={`fixed w-full z-[100] border-b transition-all ${isDarkMode ? 'bg-[#0f172a]/90 border-white/10 text-white' : 'bg-white/90 border-slate-200 text-slate-900'} backdrop-blur-md px-8 h-20 flex items-center justify-between`}>
                <Link href="/" className="text-xl font-black uppercase tracking-tighter italic">Canada<span className="text-blue-600">Limo</span></Link>
                <button onClick={toggleTheme} className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-200 hover:bg-slate-300'}`}>
                    {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
            </nav>

            {/* Selection Area */}
            <div className={`pt-32 pb-16 px-6 ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white border-b'}`}>
                <div className="max-w-6xl mx-auto">
                    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-[2.5rem] border ${isDarkMode ? 'bg-[#0f172a] border-white/10' : 'bg-slate-50 border-slate-200 shadow-xl'}`}>
                        
                        {/* 🔥 Passengers Counter (1-6) 🔥 */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black opacity-50 uppercase mb-2 ml-2 tracking-widest text-blue-500">Travelers</label>
                            <div className={`flex items-center justify-between rounded-xl p-1.5 h-[58px] ${isDarkMode ? 'bg-slate-800' : 'bg-white border'}`}>
                                <button 
                                    type="button"
                                    onClick={() => { if(passengers > 1) { setPassengers(p => p - 1); setData('passenger_count', passengers - 1); }}}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl transition-all ${passengers > 1 ? 'bg-blue-600 text-white' : 'bg-slate-700/20 text-slate-500 cursor-not-allowed'}`}
                                >-</button>
                                <div className="text-center">
                                    <span className="text-lg font-black leading-none block">{passengers}</span>
                                    <span className="text-[8px] font-bold uppercase opacity-50">Passengers</span>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => { if(passengers < 6) { setPassengers(p => p + 1); setData('passenger_count', passengers + 1); }}}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl transition-all ${passengers < 6 ? 'bg-blue-600 text-white' : 'bg-slate-700/20 text-slate-500 cursor-not-allowed'}`}
                                >+</button>
                            </div>
                        </div>

                        {/* Pickup Address */}
                        <div className="flex flex-col relative">
                            <label className="text-[10px] font-black opacity-50 uppercase mb-2 ml-2 tracking-widest text-blue-500">Pickup</label>
                            <input value={data.pickup_address} onChange={e => { setData('pickup_address', e.target.value); searchAddress(e.target.value, 'pickup'); }} className={`w-full border-none rounded-xl p-4 font-bold h-[58px] ${isDarkMode ? 'bg-slate-800' : 'bg-white border'}`} placeholder="Address..." />
                            {pickupSuggestions.length > 0 && (
                                <div className={`absolute top-full left-0 w-full mt-2 rounded-xl overflow-hidden z-[110] shadow-2xl border ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`}>
                                    {pickupSuggestions.map((s, i) => (
                                        <div key={i} onClick={() => { setData('pickup_address', s.display_name); setPickupSuggestions([]); }} className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer text-[10px] border-b border-white/5">{s.display_name}</div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Destination Address */}
                        <div className="flex flex-col relative">
                            <label className="text-[10px] font-black opacity-50 uppercase mb-2 ml-2 tracking-widest text-blue-500">Destination</label>
                            <input value={data.destination_address} onChange={e => { setData('destination_address', e.target.value); searchAddress(e.target.value, 'destination'); }} className={`w-full border-none rounded-xl p-4 font-bold h-[58px] ${isDarkMode ? 'bg-slate-800' : 'bg-white border'}`} placeholder="Where to?" />
                            {destSuggestions.length > 0 && (
                                <div className={`absolute top-full left-0 w-full mt-2 rounded-xl overflow-hidden z-[110] shadow-2xl border ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`}>
                                    {destSuggestions.map((s, i) => (
                                        <div key={i} onClick={() => { setData('destination_address', s.display_name); setDestSuggestions([]); }} className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer text-[10px] border-b border-white/5">{s.display_name}</div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Distance Info */}
                        <div className="flex flex-col justify-center items-center bg-blue-600 rounded-2xl text-white shadow-xl h-[58px] mt-auto">
                            <span className="text-[10px] font-black uppercase opacity-70">Est. Distance</span>
                            <span className="text-xl font-black">{distance > 0 ? `${distance} KM` : '-- KM'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle List */}
            <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
                {cars.map((car) => {
                    const pricing = getPricing(car, distance, passengers);
                    const isOver = passengers > car.capacity;
                    return (
                        <div key={car.id} className={`rounded-[3rem] overflow-hidden flex flex-col md:flex-row border transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
                            <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                                <img src={car.image ? `/storage/${car.image}` : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80'} className="w-full h-full object-cover" alt={car.model_name} />
                                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Max {car.capacity} Pax</div>
                            </div>
                            <div className="md:w-3/5 p-10 flex flex-col justify-between text-left">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-3xl font-black uppercase tracking-tighter italic">{car.model_name}</h2>
                                            <p className="text-blue-500 font-bold text-[10px] uppercase tracking-widest mt-1">Professional Limo Service</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-4xl font-black tracking-tighter">${pricing.total.toFixed(2)}</div>
                                            <div className="text-[10px] font-black opacity-40 uppercase tracking-widest">Total CAD</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {['Free WiFi', 'Climate Control', 'Professional Chauffeur', 'Bottled Water'].map((f, i) => (
                                            <span key={i} className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>✓ {f}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                    <p className={`text-[11px] font-bold italic ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Rate: ${pricing.perPerson.toFixed(2)} / person</p>
                                    {!isOver ? (
                                        <button onClick={() => handleOpenModal(car)} className={`px-10 py-4 rounded-2xl font-black tracking-widest transition-all active:scale-95 shadow-xl ${isDarkMode ? 'bg-white text-slate-900 hover:bg-blue-600 hover:text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}`}>BOOK NOW</button>
                                    ) : (
                                        <span className="text-red-500 text-[10px] font-black uppercase bg-red-500/10 px-6 py-3 rounded-xl">Vehicle Too Small</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 z-[200]">
                    <div className={`rounded-[3rem] p-12 max-w-xl w-full animate-in zoom-in duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-2xl border'}`}>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-center italic">Complete Booking</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <input type="text" placeholder="Full Name" required className={`w-full border-none rounded-xl p-4 font-bold ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100 text-slate-950'}`} onChange={e => setData('customer_name', e.target.value)} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="email" placeholder="Email" required className={`w-full border-none rounded-xl p-4 font-bold ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100 text-slate-950'}`} onChange={e => setData('customer_email', e.target.value)} />
                                <input type="text" placeholder="Phone" required className={`w-full border-none rounded-xl p-4 font-bold ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100 text-slate-950'}`} onChange={e => setData('customer_phone', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="datetime-local" required className={`w-full border-none rounded-xl p-4 font-bold text-xs ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100 text-slate-950'}`} onChange={e => setData('pickup_time', e.target.value)} />
                                <input type="text" placeholder="Flight # (Optional)" className={`w-full border-none rounded-xl p-4 font-bold uppercase ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100 text-slate-950'}`} onChange={e => setData('flight_number', e.target.value)} />
                            </div>
                            <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black tracking-widest mt-6 shadow-xl active:scale-95 hover:bg-blue-700">
                                {processing ? '...' : `CONFIRM FOR ${passengers} PAX`}
                            </button>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="w-full text-slate-500 font-bold text-xs uppercase mt-4">Go Back</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}