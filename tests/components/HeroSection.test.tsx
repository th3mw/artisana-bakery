import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/home/HeroSection';

describe('HeroSection', () => {
  it('renders hero title and core trust badges', () => {
    render(<HeroSection onExplore={() => {}} onOrderClick={() => {}} />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Baked With Obsession/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/No Preservatives/i)).toBeInTheDocument();
    expect(screen.getByText(/Chilled Lagos Delivery/i)).toBeInTheDocument();
  });
});
