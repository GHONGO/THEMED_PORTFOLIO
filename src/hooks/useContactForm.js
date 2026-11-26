import { useState } from 'react'
import { profile } from '../data/profile'

// Shared by every theme's contact form. Submits in the background so the visitor
// stays on the page (the old redirect sent successful senders to the 404 page).
export default function useContactForm() {
    const empty = { name: '', email: '', message: '' }
    const [form, setForm] = useState(empty)
    const [status, setStatus] = useState('idle') // idle | sending | sent | error

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    async function onSubmit(e) {
        e.preventDefault()
        setStatus('sending')
        try {
            const res = await fetch(profile.formEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ ...form, _subject: 'New submission from Portfolio!' }),
            })
            if (!res.ok) throw new Error('Request failed')
            setForm(empty)
            setStatus('sent')
        } catch {
            setStatus('error')
        }
    }

    return { form, status, onChange, onSubmit }
}
