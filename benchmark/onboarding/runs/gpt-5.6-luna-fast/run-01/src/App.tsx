import { FormEvent, useState } from 'react';

type FormData = { workspace: string; size: string; industry: string; source: string; updates: boolean };
const initial: FormData = { workspace: '', size: '', industry: '', source: '', updates: false };

export function App() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === 'workspace') setError('');
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const workspace = form.workspace.trim();
    if (!workspace) {
      setError('Enter a workspace name to continue.');
      return;
    }

    // The workspace name is the only information needed to create a workspace.
    localStorage.setItem('northstar-onboarding', JSON.stringify({ ...form, workspace }));
    setSubmitted(true);
  }

  if (submitted) return <main className="shell"><section className="card success"><p className="eyebrow">NORTHSTAR</p><h1>Workspace created.</h1><p>You're ready to start exploring.</p></section></main>;

  return <main className="shell">
    <section className="card">
      <p className="eyebrow">NORTHSTAR</p>
      <div className="progress"><span /></div>
      <p className="step">Quick setup · 1 of 1</p>
      <h1>Create your workspace</h1>
      <p className="lede">Start with a name and get straight to exploring Northstar. You can personalize your workspace anytime.</p>
      {error && <div className="error" role="alert">{error}</div>}
      <form onSubmit={submit}>
        <label>Workspace name <span className="required">Required</span><input autoFocus required value={form.workspace} onChange={(e)=>update('workspace',e.target.value)} placeholder="e.g. Acme Inc" aria-describedby="workspace-help" /></label>
        <p id="workspace-help" className="field-help">This is the name your team will see.</p>

        <details>
          <summary>Personalize your experience <span>Optional</span></summary>
          <div className="optional-fields">
            <label>Company size <span className="optional">Optional</span><select value={form.size} onChange={(e)=>update('size',e.target.value)}><option value="">Select company size</option><option>Just me</option><option>2-10</option><option>11-50</option><option>51-200</option><option>201+</option></select></label>
            <p className="field-help">Tell us about the people who will use this workspace.</p>
            <label>Industry <span className="optional">Optional</span><select value={form.industry} onChange={(e)=>update('industry',e.target.value)}><option value="">Select industry</option><option>Technology</option><option>Finance</option><option>Retail</option><option>Other</option></select></label>
            <label>How did you hear about us? <span className="optional">Optional</span><input value={form.source} onChange={(e)=>update('source',e.target.value)} placeholder="Optional" /></label>
            <label className="checkbox"><input type="checkbox" checked={form.updates} onChange={(e)=>update('updates',e.target.checked)} />Receive product updates and tips</label>
          </div>
        </details>
        <button type="submit">Create workspace</button>
      </form>
      <p className="fineprint">By continuing you agree to our Terms and Privacy Policy.</p>
    </section>
  </main>;
}
