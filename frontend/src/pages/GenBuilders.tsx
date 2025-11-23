import React from 'react'

const buildersHtml = `
<div id="center-builders" class="hidden">
  <div class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 p-6">
    <h3 class="text-base font-semibold tracking-tight">Builders</h3>
    <p class="mt-1 text-sm text-neutral-400">Coming soon — discover and follow top builders in the ecosystem.</p>
  </div>
</div>
`;

export default function GenBuilders() {
  return <div dangerouslySetInnerHTML={{ __html: buildersHtml }} />
}
