import React, { useState } from 'react'
import { FaEnvelope, FaWhatsapp, FaCalendarAlt, FaGithub, FaLinkedin } from 'react-icons/fa'
import useContactForm from '../../hooks/useContactForm'
import { profile } from '../../data/profile'

const messages = {
    sent: 'Transmission sent. Expect a reply soon.',
    error: 'Transmission failed. Try again or use a channel on the right.',
}

export default function Contact() {
    const { form, status, onChange, onSubmit } = useContactForm()
    const [decrypted, setDecrypted] = useState(false)

    return (
        <>
            <div className="g-contact">
                <div className="g-stack">
                    <div className="g-title-panel cut-a">
                        <h1 className="g-h g-h--xl">Direct dispatch / contact</h1>
                    </div>

                    <form onSubmit={onSubmit} className="g-panel cut-a g-form">
                        <h2><em>Send</em> direct message</h2>

                        <label className="g-field cut-a">
                            <span className="sr-only">Your name or alias</span>
                            <input required name="name" value={form.name} onChange={onChange} placeholder="Your name / alias" autoComplete="name" />
                        </label>
                        <label className="g-field cut-a">
                            <span className="sr-only">Your email</span>
                            <input required type="email" name="email" value={form.email} onChange={onChange} placeholder="Your email" autoComplete="email" />
                        </label>
                        <label className="g-field cut-a">
                            <span className="sr-only">Message</span>
                            <textarea required name="message" value={form.message} onChange={onChange} placeholder="Message / intel" />
                        </label>

                        <button type="submit" disabled={status === 'sending'} className="g-btn g-btn--hot g-btn--block cut-a">
                            {status === 'sending' ? 'Transmitting...' : 'Send transmission / dispatch'}
                        </button>
                        <p role="status" className={`g-status ${status === 'error' ? 'g-bad' : 'g-ok'}`}>{messages[status]}</p>
                    </form>
                </div>

                <div className="g-stack">
                    <section aria-labelledby="g-avail">
                        <h2 id="g-avail" className="g-h g-h--tight">Availability status</h2>
                        <div className="g-avail cut-a">
                            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                                <circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="12" opacity=".6" />
                                <path d="M32 4v12M32 48v12M4 32h12M48 32h12" />
                                <circle cx="32" cy="32" r="5" fill="currentColor" stroke="none" />
                                <circle className="g-ping" cx="32" cy="32" r="18" strokeWidth="2" />
                            </svg>
                            <h2>Available for contracts &amp; heists<br />Active status: online</h2>
                        </div>
                    </section>

                    <section aria-labelledby="g-chan">
                        <h2 id="g-chan" className="g-h g-h--tight">Quick contact channels</h2>
                        <ul className="g-panel cut-a g-channels">
                            <li><FaEnvelope aria-hidden="true" /><span>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></span></li>
                            <li>
                                <FaWhatsapp aria-hidden="true" />
                                <span>
                                    WhatsApp:{' '}
                                    {decrypted
                                        ? <a href={profile.socials.whatsapp} target="_blank" rel="noreferrer">{profile.whatsapp}</a>
                                        : <button type="button" onClick={() => setDecrypted(true)} aria-label="Decrypt WhatsApp number">[Encrypted]</button>}
                                </span>
                            </li>
                            <li><FaCalendarAlt aria-hidden="true" /><span><a href={profile.calendly} target="_blank" rel="noreferrer">Book a meeting</a></span></li>
                        </ul>
                    </section>

                    <section aria-labelledby="g-soc">
                        <h2 id="g-soc" className="g-h g-h--tight">Socials &amp; networks</h2>
                        <ul className="g-socials">
                            {[
                                { name: 'GitHub', icon: FaGithub, href: profile.socials.github },
                                { name: 'LinkedIn', icon: FaLinkedin, href: profile.socials.linkedin },
                                { name: 'WhatsApp', icon: FaWhatsapp, href: profile.socials.whatsapp },
                            ].map((s) => {
                                const Icon = s.icon
                                return (
                                    <li key={s.name}>
                                        <a href={s.href} target="_blank" rel="noreferrer" className="g-social cut-a">
                                            <Icon aria-hidden="true" />
                                            <span>{s.name}<small>Connected</small></span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                </div>
            </div>
        </>
    )
}
