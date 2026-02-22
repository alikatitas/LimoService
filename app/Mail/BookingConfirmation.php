<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Rezervasyon verisini tutacak değişken.
     * Public olduğu için Blade şablonunda direkt erişilebilir.
     */
    public $booking;

    /**
     * Create a new message instance.
     */
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    /**
     * Mailin Başlık Bilgisi
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reservation Confirmed - #' . $this->booking->id . ' Canada Premium Limo',
        );
    }

    /**
     * Mailin HTML Şablonu
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.booking_confirmation',
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}