'use client';

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function FavoriteButton({
  label,
  targetId,
  targetType,
}: {
  label: string;
  targetId?: string;
  targetType?: 'DESTINATION' | 'HOTEL' | 'EXPERIENCE';
}) {
  const [active, setActive] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!targetId) return;
    apiFetch<{ id: string; targetId: string }[]>('/api/v1/me/favorites')
      .then((items) => {
        const match = items.find((item) => item.targetId === targetId);
        if (match) {
          setActive(true);
          setFavoriteId(match.id);
        }
      })
      .catch(() => null);
  }, [targetId]);
  async function toggle(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!targetId || !targetType) return;
    setBusy(true);
    try {
      if (active && favoriteId) {
        await apiFetch(`/api/v1/me/favorites/${favoriteId}`, { method: 'DELETE' });
        setActive(false);
        setFavoriteId(null);
      } else {
        const favorite = await apiFetch<{ id: string }>('/api/v1/me/favorites', {
          method: 'POST',
          body: JSON.stringify({ targetId, targetType }),
        });
        setActive(true);
        setFavoriteId(favorite.id);
      }
    } catch (error) {
      if (
        error instanceof Error &&
        'status' in error &&
        (error as { status: number }).status === 401
      )
        router.push('/login');
    } finally {
      setBusy(false);
    }
  }
  return (
    <button
      type="button"
      aria-label={`${active ? 'Remove' : 'Add'} ${label} ${active ? 'from' : 'to'} favorites`}
      aria-pressed={active}
      onClick={toggle}
      disabled={busy}
      className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 active:scale-90 ${active ? 'border-primary bg-primary text-primary-foreground' : 'border-white/35 bg-ink/30 text-white hover:border-primary hover:text-primary'}`}
    >
      <Heart size={18} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
