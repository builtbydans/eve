import { FormEvent, useState } from 'react';

type FormData = {
  workspace: string;
  size: string;
  industry: string;
  source: string;
  updates: boolean;
};

const initial: FormData = { workspace: '', size: '', industry: '', source: '', updates: false };

export function App() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setError('');
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.workspace.trim()) {
      setError('Please enter a name for your workspace to continue.');
      return;
    }
    localStorage.setItem('northstar-onboarding', JSON.stringify(form));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="shell">
        <section className="card success">
          <p className="eyebrow">NORTHSTAR</p>
          <h1>Workspace created.</h1>
          <p>You're ready to start exploring.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <section className="card">
        <p className="eyebrow">NORTHSTAR</p>
        <h1>Create your workspace</h1>
        <p className="lede">
          Give your workspace a name and you're in. Everything else can be set up later.
        </p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={submit}>
          {/* Required */}
          <label>
            Workspace name
            <span className="field-hint">
              This is the name your team will see — your company or project name works well.
            </span>
            <input
              autoFocus
              value={form.workspace}
              onChange={(e) => update('workspace', e.target.value)}
              placeholder="e.g. Acme Inc"
            />
          </label>

          {/* Optional extras */}
          <details className="optional-section">
            <summary>Optional — help us tailor your experience</summary>
            <div className="optional-fields">
              <label>
                Team size
                <span className="field-hint">How many people will use this workspace?</span>
                <select value={form.size} onChange={(e) => update('size', e.target.value)}>
                  <option value="">Prefer not to say</option>
                  <option>Just me</option>
                  <option>2–10</option>
                  <option>11–50</option>
                  <option>51–200</option>
                  <option>201+</option>
                </select>
              </label>

              <label>
                Industry
                <select value={form.industry} onChange={(e) => update('industry', e.target.value)}>
                  <option value="">Prefer not to say</option>
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Retail</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                How did you hear about us?
                <input
                  value={form.source}
                  onChange={(e) => update('source', e.target.value)}
                  placeholder="Optional"
                />
              </label>
            </div>
          </details>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.updates}
              onChange={(e) => update('updates', e.target.checked)}
            />
            Receive product updates and tips
          </label>

          <button type="submit">Create workspace</button>
        </form>

        <p className="fineprint">By continuing you agree to our Terms and Privacy Policy.</p>
      </section>
    </main>
  );
}
