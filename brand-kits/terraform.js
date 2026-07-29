/**
 * Terraform Brand Kit
 * Planetary terraforming theme — reshaping digital worlds to suit your media needs
 */
(function() {
    'use strict';

    const terraformKit = {
        // Brand Identity
        name: 'Terraform',
        archetype: 'Magician',
        experienceArchetype: 'Immersive',
        concept: 'Reshaping digital worlds to suit your media needs',

        // Color Palette
        palette: {
            primary: '#06D6A0',    // Vibrant teal-green (life spring)
            secondary: '#1B998B',   // Deep teal (ocean depth)
            accent: '#EF476F',      // Coral pink (energy pulse)
            dark: '#26547C',        // Deep navy-blue (cosmic void)
            light: '#FFD166',       // Warm gold (solar energy)
            background: '#0D1B2A',  // Deep space black
            surface: '#1B2838',     // Dark surface
            text: '#E8F1F2',        // Soft white
            textMuted: '#7B8C9A'    // Muted gray-blue
        },

        // Typography
        typography: {
            display: "'Orbitron', 'Courier New', monospace",
            heading: "'Exo 2', 'Courier New', monospace",
            body: "'IBM Plex Sans', 'Courier New', monospace",
            mono: "'IBM Plex Mono', 'Courier New', monospace"
        },

        // Visual Elements
        elements: [
            'Planetary surfaces',
            'Atmosphere layers',
            'Mining drones',
            'Colony domes'
        ],

        // Motion & Animation
        motion: [
            'Crater formations',
            'Terraforming pulses',
            'Atmospheric glows'
        ],

        // Key Visual Features
        features: {
            planetary: true,
            atmospheric: true,
            industrial: true,
            transformative: true
        },

        // Animation Timing
        timing: {
            pulse: '2.5s',
            orbit: '20s',
            terraform: '4s',
            glow: '3s'
        },

        // CSS Variables
        cssVariables: function() {
            return `:root {
                --tf-primary: ${this.palette.primary};
                --tf-secondary: ${this.palette.secondary};
                --tf-accent: ${this.palette.accent};
                --tf-dark: ${this.palette.dark};
                --tf-light: ${this.palette.light};
                --tf-bg: ${this.palette.background};
                --tf-surface: ${this.palette.surface};
                --tf-text: ${this.palette.text};
                --tf-text-muted: ${this.palette.textMuted};
                --tf-font-display: ${this.typography.display};
                --tf-font-heading: ${this.typography.heading};
                --tf-font-body: ${this.typography.body};
                --tf-font-mono: ${this.typography.mono};
                --tf-pulse: ${this.timing.pulse};
                --tf-orbit: ${this.timing.orbit};
                --tf-terraform: ${this.timing.terraform};
                --tf-glow: ${this.timing.glow};
            }`;
        }
    };

    // Export for use
    if (typeof window !== 'undefined') {
        window.TerraformKit = terraformKit;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = terraformKit;
    }
})();
