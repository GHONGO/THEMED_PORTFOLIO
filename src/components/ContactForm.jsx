import React from 'react'
import useContactForm from '../hooks/useContactForm'

const field = "w-full mt-1 p-3 bg-card border border-border rounded focus:border-ring outline-none transition-colors text-foreground"

export default function ContactForm() {
    const { form, status, onChange, onSubmit } = useContactForm()

    return (
        <form onSubmit={onSubmit} className="max-w-xl">
            <label htmlFor="cf-name" className="block text-sm text-foreground">Name</label>
            <input id="cf-name" required name="name" value={form.name} onChange={onChange} className={field} />

            <label htmlFor="cf-email" className="block text-sm text-foreground mt-4">Email</label>
            <input id="cf-email" required type="email" name="email" value={form.email} onChange={onChange} className={field} />

            <label htmlFor="cf-message" className="block text-sm text-foreground mt-4">Message</label>
            <textarea id="cf-message" required name="message" value={form.message} onChange={onChange} rows="6" className={field} />

            <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                <p role="status" className="text-sm text-foreground">
                    {status === 'sent' && 'Message sent. Thanks, I will reply soon.'}
                    {status === 'error' && 'Could not send. Please try again or reach me on WhatsApp.'}
                </p>
            </div>
        </form>
    )
}
