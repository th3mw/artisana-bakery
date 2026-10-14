import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WasteToWealth } from '@/components/home/WasteToWealth';

describe('WasteToWealth Component', () => {
  it('highlights the circular coconut upcycling story', () => {
    render(<WasteToWealth onExplorePantry={() => {}} />);
    expect(screen.getByText(/Waste-to-Wealth/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcycled Coconut Pulp/i)).toBeInTheDocument();
  });
});
