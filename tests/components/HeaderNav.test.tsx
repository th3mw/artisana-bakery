import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { TrayProvider } from '@/context/TrayContext';

describe('HeaderNav Component', () => {
  it('renders brand logo and collection links', () => {
    render(
      <TrayProvider>
        <HeaderNav onOpenTray={() => {}} />
      </TrayProvider>
    );
    expect(screen.getByText(/ARTISANA/i)).toBeInTheDocument();
    expect(screen.getByText(/Collections/i)).toBeInTheDocument();
    expect(screen.getByText(/Story/i)).toBeInTheDocument();
  });
});
