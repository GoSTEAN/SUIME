import React, { useState } from 'react';

export type ProfileData = {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
};

type Props = {
  initial?: ProfileData;
  onUpdate?: (data: ProfileData) => void;
  className?: string;
};

const UpdateProfile: React.FC<Props> = ({ initial, onUpdate, className = '' }) => {
  const [displayName, setDisplayName] = useState(initial?.displayName ?? '');
  const [bio, setBio] = useState(initial?.bio ?? '');
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatarUrl ?? '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: ProfileData = {
      displayName: displayName.trim() || undefined,
      bio: bio.trim() || undefined,
      avatarUrl: avatarUrl.trim() || undefined,
    };

    try {
      if (onUpdate) await onUpdate(payload);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-neutral-300">Display name</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="mt-1 block w-full rounded-md border-neutral-700 bg-neutral-900 text-white p-2"
          placeholder="Your public name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 block w-full rounded-md border-neutral-700 bg-neutral-900 text-white p-2"
          rows={3}
          placeholder="A short bio (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300">Avatar URL (optional)</label>
        <input
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-neutral-700 bg-neutral-900 text-white p-2"
          placeholder="https://..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Update profile'}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
