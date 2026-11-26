import React from 'react'
import { certifications, isValid, certStats } from '../data/certifications'

export default function Certifications() {
    return (
        <section>
            <h2 className="text-3xl font-bold">Certifications</h2>
            <p className="text-foreground mt-2">
                {certStats.total} verified credentials and specialised training across cloud, frontend and project delivery.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((c) => {
                    const Icon = c.icon
                    return (
                        <article key={c.id} className="flex flex-col bg-card border border-border rounded-lg p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-11 h-11 shrink-0 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                    <Icon size={24} color={c.color} aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground leading-snug">{c.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{c.issuer}</p>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-foreground">
                                <span>Earned {c.earned}</span>
                                <span className="px-3 py-1 rounded-full bg-secondary">{isValid(c) ? 'Valid' : 'Expired'}</span>
                            </div>

                            {c.url ? (
                                <a href={c.url} target="_blank" rel="noreferrer" className="mt-4 text-sm font-semibold text-primary hover:underline">
                                    View credential
                                </a>
                            ) : (
                                <span className="mt-4 text-sm text-muted-foreground">Credential available on request</span>
                            )}
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
