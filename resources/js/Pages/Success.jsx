import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Success({ booking }) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <Head title="Booking Confirmed | Canada Premium Limo" />

            <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-500">
                {/* Üst Kısım: Başarı İkonu */}
                <div className="bg-emerald-500 p-12 text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase">Reservation Received!</h1>
                    <p className="text-emerald-100 font-medium mt-2">Your premium ride in Canada is being prepared.</p>
                </div>

                {/* Orta Kısım: Rezervasyon Özeti */}
                <div className="p-10 space-y-8">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reservation ID</p>
                            <p className="text-xl font-bold text-slate-900">#LIMO-{booking.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Price</p>
                            <p className="text-xl font-black text-emerald-600">${booking.total_price} CAD</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Passenger</p>
                                <p className="font-bold text-slate-700">{booking.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Pickup Time</p>
                                <p className="font-bold text-slate-700">{booking.pickup_time}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Route</p>
                                <p className="font-bold text-slate-700 leading-tight">
                                    {booking.pickup_address} <br />
                                    <span className="text-blue-500">→</span> {booking.destination_address}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-4">
                        <div className="text-blue-500 mt-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
                        </div>
                        <p className="text-xs text-blue-700 font-medium leading-relaxed">
                            A confirmation email has been sent to <strong>{booking.customer_email}</strong>. 
                            Our chauffeur will contact you shortly via phone for final coordination.
                        </p>
                    </div>

                    <div className="pt-6">
                        <Link 
                            href="/" 
                            className="block w-full text-center bg-slate-900 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-blue-600 transition shadow-xl"
                        >
                            RETURN TO HOME
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}