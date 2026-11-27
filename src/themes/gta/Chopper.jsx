import React from 'react'

// Original side-view helicopter sprite, drawn facing right around (0,0).
// Position, flip, tilt and size are applied each frame by useChopper.
// The searchlight cone ends in a spot centred at (34, 52) - keep in sync with SPOT in useChopper.
export default function Chopper({ spriteRef }) {
    return (
        <g ref={spriteRef} className="g-chopper" data-state="patrol">
            <g className="g-beam">
                <polygon points="8,12 -4,52 72,52 14,12" />
                <ellipse cx="34" cy="52" rx="38" ry="11" />
            </g>
            <path className="g-heli-body" d="M-14-4L-58-9L-60-3L-14 6Z" />
            <path className="g-heli-body" d="M-56-8L-64-22L-58-22L-50-8Z" />
            <ellipse className="g-rotor g-rotor--tail" cx="-61" cy="-14" rx="2" ry="9" />
            <ellipse className="g-heli-body" cx="2" cy="2" rx="25" ry="14" />
            <path className="g-heli-glass" d="M10-9C24-9 30 0 28 6L10 6Z" />
            <rect className="g-heli-body" x="-1" y="-18" width="5" height="7" />
            <ellipse className="g-rotor-disc" cx="1" cy="-19" rx="48" ry="5" />
            <ellipse className="g-rotor" cx="1" cy="-19" rx="48" ry="2.4" />
            <path className="g-heli-skid" d="M-16 21H24M-8 14V21M14 14V21" />
            <circle className="g-navlight" cx="-62" cy="-4" r="2.2" />
            <circle className="g-strobe" cx="2" cy="16.5" r="1.8" />
        </g>
    )
}
