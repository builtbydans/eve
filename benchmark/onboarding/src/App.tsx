import { FormEvent, useState } from 'react';

type FormData = { workspace: string; size: string; industry: string; source: string; updates: boolean };
const initial: FormData = { workspace: '', size: '', industry: '', source: '', updates: true };

export function App() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.workspace || !form.size || !form.industry || !form.source) {
      setError('Please complete every field before continuing.');
      return;
    }
    localStorage.setItem('northstar-onboarding', JSON.stringify(form));
    setSubmitted(true);
  }

  if (submitted) return <main className="shell"><section className="card success"><p className="eyebrow">NORTHSTAR</p><h1>Workspace created.</h1><p>You're ready to start exploring.</p></section></main>;

  return <main className="shell">
    <section className="card">
      <p className="eyebrow">NORTHSTAR</p>
      <div className="progress"><span /></div>
      <p className="step">Step 1 of 4</p>
      <h1>Create your workspace</h1>
      <p className="lede">Tell us a little about your company before you get started.</p>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit}>
        <label>Workspace name<input autoFocus value={form.workspace} onChange={(e)=>update('workspace',e.target.value)} placeholder="e.g. Acme Inc" /></label>
        <label>Company size<select value={form.size} onChange={(e)=>update('size',e.target.value)}><option value="">Select company size</option><option>1-10</option><option>11-50</option><option>51-200</option><option>201+</option></select></label>
        <label>Industry<select value={form.industry} onChange={(e)=>update('industry',e.target.value)}><option value="">Select industry</option><option>Technology</option><option>Finance</option><option>Retail</option><option>Other</option></select></label>
        <label>How did you hear about us?<input value={form.source} onChange={(e)=>update('source',e.target.value)} placeholder="Tell us where you found us" /></label>
        <label className="checkbox"><input type="checkbox" checked={form.updates} onChange={(e)=>update('updates',e.target.checked)} />Receive product updates and tips</label>
        <button type="submit">Continue</button>
      </form>
      <p className="fineprint">By continuing you agree to our Terms and Privacy Policy.</p>
    </section>
  </main>;
}
