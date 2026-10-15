import { useState } from "react";
import {
  Vote, Users, ShieldCheck, Home, UserRound,
  ChartColumn, LogOut, CheckCircle2, ArrowRight,
  Info, Menu, X
} from "lucide-react";

const initialCandidates = [
  {
    id: 1,
    name: "Arjun Mehta",
    party: "Independent",
    symbol: "🪁",
    votes: 18
  },
  {
    id: 2,
    name: "Priya Sharma",
    party: "National Party",
    symbol: "🌱",
    votes: 25
  },
  {
    id: 3,
    name: "Rohan Das",
    party: "People's Party",
    symbol: "☀️",
    votes: 14
  }
];

export default function App() {
  const [page, setPage] = useState("home");
  const [registered, setRegistered] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    department: "",
    password: ""
  });

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [candidates, setCandidates] =
    useState(initialCandidates);

  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [notice, setNotice] = useState("");

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  function goTo(nextPage) {
    setPage(nextPage);
    setNotice("");
  }

  function updateForm(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function registerVoter(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.dob ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.department ||
      !form.password
    ) {
      setNotice("Please complete every field.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      setNotice("Enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setNotice("Enter a 10-digit mobile number.");
      return;
    }

    if (form.password.length < 6) {
      setNotice("Password must contain at least 6 characters.");
      return;
    }

    setUser({
      name: form.name.trim(),
      email: form.email.trim()
    });

    setRegistered(true);
    setNotice("");
    setPage("dashboard");
  }

  function loginVoter(event) {
    event.preventDefault();

    if (!login.email.trim() || !login.password) {
      setNotice("Enter your email and password.");
      return;
    }

    if (
      registered &&
      login.email.toLowerCase() === user.email.toLowerCase()
    ) {
      setNotice("");
      setPage("dashboard");
    } else {
      setNotice(
        "Register first and use your registered email in this demo."
      );
    }
  }

  function castVote() {
    if (!registered) {
      setNotice("Please register before voting.");
      setPage("register");
      return;
    }

    if (hasVoted) {
      setNotice("You have already voted in this demo session.");
      return;
    }

    if (selected === null) {
      setNotice("Please select a candidate first.");
      return;
    }

    setCandidates(current =>
      current.map(candidate =>
        candidate.id === selected
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );

    setHasVoted(true);
    setNotice("");
    setPage("confirmation");
  }

  function logout() {
    setPage("home");
    setNotice("");
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "My Profile", icon: UserRound },
    { id: "vote", label: "Cast Vote", icon: Vote },
    { id: "results", label: "Results", icon: ChartColumn }
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => goTo("home")}
        >
          <span className="brand-mark">
            <Vote size={22} />
          </span>
          VoteSphere
        </button>

        <nav className="top-links">
          <button onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("register")}>Register</button>
          <button onClick={() => goTo("login")}>Login</button>
          {registered && (
            <button onClick={() => goTo("dashboard")}>
              Dashboard
            </button>
          )}
        </nav>
      </header>

      {notice && (
        <div className="notice" role="status">
          <Info size={18} />
          <span>{notice}</span>
          <button onClick={() => setNotice("")}>
            <X size={16} />
          </button>
        </div>
      )}

      {page === "home" && (
        <main className="hero page-width">
          <section className="hero-copy">
            <span className="eyebrow">
              STUDENT MINI PROJECT
            </span>

            <h1>
              Your voice.
              <br />
              <span>Your choice.</span>
            </h1>

            <p className="hero-lead">
              A simple voter registration and online
              voting demonstration built to make the
              process clear and accessible.
            </p>

            <div className="hero-actions">
              <button
                className="button primary"
                onClick={() => goTo("register")}
              >
                Register as a voter <ArrowRight size={17} />
              </button>

              <button
                className="button secondary"
                onClick={() => goTo("login")}
              >
                Login
              </button>
            </div>

            <div className="trust-row">
              <span><ShieldCheck size={17} /> Demo interface</span>
              <span><CheckCircle2 size={17} /> Easy to use</span>
            </div>
          </section>

          <section className="hero-visual">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="vote-illustration">
              <div className="paper">
                <CheckCircle2 size={54} />
              </div>
              <div className="ballot-slot"></div>
              <div className="ballot-box">
                <Vote size={50} />
                <strong>YOUR VOTE</strong>
              </div>
            </div>
          </section>

          <section className="feature-strip">
            <article>
              <div className="feature-icon blue">
                <Users size={21} />
              </div>
              <div>
                <h3>Voter registration</h3>
                <p>Enter details in a validated form.</p>
              </div>
            </article>

            <article>
              <div className="feature-icon green">
                <Vote size={21} />
              </div>
              <div>
                <h3>Candidate selection</h3>
                <p>Review the sample candidates.</p>
              </div>
            </article>

            <article>
              <div className="feature-icon violet">
                <ChartColumn size={21} />
              </div>
              <div>
                <h3>Election results</h3>
                <p>View sample vote totals.</p>
              </div>
            </article>
          </section>

          <p className="demo-note">
            Academic prototype only. This is not an official
            election system.
          </p>
        </main>
      )}

      {page === "register" && (
        <main className="page-width form-layout">
          <section className="form-intro">
            <span className="eyebrow">GET STARTED</span>
            <h1>Voter <span>registration</span></h1>
            <p>
              Create a demo voter profile to explore the portal.
              Use fictional details for your class presentation.
            </p>

            <div className="info-panel">
              <ShieldCheck size={25} />
              <div>
                <strong>Registration checklist</strong>
                <p>
                  Enter a valid email format and a 10-digit
                  demo mobile number.
                </p>
              </div>
            </div>
          </section>

          <form
            className="panel form-panel"
            onSubmit={registerVoter}
          >
            <div className="panel-heading">
              <h2>Personal details</h2>
              <p>All fields are required.</p>
            </div>

            <div className="field-grid">
              <label>
                Full name *
                <input
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  placeholder="Enter full name"
                  required
                />
              </label>

              <label>
                Date of birth *
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={updateForm}
                  required
                />
              </label>

              <label>
                Email address *
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Mobile number *
                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateForm}
                  inputMode="numeric"
                  maxLength="10"
                  placeholder="10-digit number"
                  required
                />
              </label>

              <label className="full-field">
                Department / course *
                <select
                  name="department"
                  value={form.department}
                  onChange={updateForm}
                  required
                >
                  <option value="">Select department</option>
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Electronics</option>
                  <option>Mechanical Engineering</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="full-field">
                Create demo password *
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={updateForm}
                  minLength="6"
                  placeholder="At least 6 characters"
                  required
                />
              </label>
            </div>

            <p className="privacy-note">
              Use fictional details. Do not enter real
              identity numbers or sensitive information.
            </p>

            <button className="button primary wide" type="submit">
              Complete registration <ArrowRight size={17} />
            </button>

            <p className="form-footer">
              Already registered?{" "}
              <button
                type="button"
                onClick={() => goTo("login")}
              >
                Login here
              </button>
            </p>
          </form>
        </main>
      )}

      {page === "login" && (
        <main className="page-width login-layout">
          <section className="login-art">
            <div className="big-shield">
              <ShieldCheck size={66} />
            </div>
            <h1>Welcome back.</h1>
            <p>
              Continue to your demo voter dashboard and
              explore the voting workflow.
            </p>
          </section>

          <form className="panel login-panel" onSubmit={loginVoter}>
            <span className="eyebrow">VOTER ACCESS</span>
            <h2>Login to VoteSphere</h2>
            <p className="muted">
              Use the email you registered with in this session.
            </p>

            <label>
              Email address
              <input
                type="email"
                value={login.email}
                onChange={event =>
                  setLogin({
                    ...login,
                    email: event.target.value
                  })
                }
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={login.password}
                onChange={event =>
                  setLogin({
                    ...login,
                    password: event.target.value
                  })
                }
                placeholder="Enter demo password"
                required
              />
            </label>

            <button className="button primary wide" type="submit">
              Login <ArrowRight size={17} />
            </button>

            <p className="form-footer">
              New here?{" "}
              <button
                type="button"
                onClick={() => goTo("register")}
              >
                Register as a voter
              </button>
            </p>
          </form>
        </main>
      )}

      {[
        "dashboard",
        "profile",
        "vote",
        "results",
        "confirmation"
      ].includes(page) && (
        <main className="portal page-width">
          <aside className="sidebar">
            <div className="sidebar-user">
              <div className="avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "G"}
              </div>
              <div>
                <strong>{user.name || "Guest Voter"}</strong>
                <small>
                  {registered ? "Demo registered voter" : "Preview mode"}
                </small>
              </div>
            </div>

            <div className="side-label">WORKSPACE</div>

            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`side-link ${
                    page === item.id ? "active" : ""
                  }`}
                  onClick={() => goTo(item.id)}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}

            <button className="side-link" onClick={logout}>
              <LogOut size={18} /> Exit portal
            </button>

            <div className="sidebar-bottom">
              <ShieldCheck size={17} />
              <span>
                Academic demo
                <br />
                <small>No official voting</small>
              </span>
            </div>
          </aside>

          <section className="portal-content">
            <div className="portal-heading">
              <div>
                <span className="eyebrow">VOTER WORKSPACE</span>
                <h1>
                  {page === "dashboard"
                    ? `Welcome${user.name ? `, ${user.name.split(" ")[0]}` : ""}!`
                    : page === "profile"
                    ? "My profile"
                    : page === "vote"
                    ? "Cast your vote"
                    : page === "results"
                    ? "Election results"
                    : "Vote recorded"}
                </h1>
                <p>
                  Explore your VoteSphere demo portal.
                </p>
              </div>
              <span className="election-tag">
                <span className="live-dot"></span>
                CLASSROOM ELECTION
              </span>
            </div>

            {page === "dashboard" && (
              <>
                <div className="stat-grid">
                  <article className="stat-card">
                    <div className="stat-symbol blue">
                      <Users size={21} />
                    </div>
                    <span>Registration</span>
                    <strong>{registered ? "Complete" : "Preview"}</strong>
                    <small>Demo profile status</small>
                  </article>

                  <article className="stat-card">
                    <div className="stat-symbol green">
                      <Vote size={21} />
                    </div>
                    <span>Voting status</span>
                    <strong>{hasVoted ? "Submitted" : "Not voted"}</strong>
                    <small>One vote per demo session</small>
                  </article>

                  <article className="stat-card">
                    <div className="stat-symbol violet">
                      <ChartColumn size={21} />
                    </div>
                    <span>Election</span>
                    <strong>Demo 2026</strong>
                    <small>Sample candidate list</small>
                  </article>
                </div>

                <div className="section-title">
                  <div>
                    <h2>Quick actions</h2>
                    <p>Choose where you want to go next.</p>
                  </div>
                </div>

                <div className="action-grid">
                  <button
                    className="action-card action-primary"
                    onClick={() => goTo("vote")}
                  >
                    <span className="action-icon">
                      <Vote size={23} />
                    </span>
                    <span>
                      <strong>Cast your vote</strong>
                      <small>Open candidate selection</small>
                    </span>
                    <ArrowRight />
                  </button>

                  <button
                    className="action-card"
                    onClick={() => goTo("results")}
                  >
                    <span className="action-icon chart">
                      <ChartColumn size={23} />
                    </span>
                    <span>
                      <strong>View results</strong>
                      <small>Explore sample totals</small>
                    </span>
                    <ArrowRight />
                  </button>
                </div>

                <div className="tip-box">
                  <Info size={19} />
                  <p>
                    <strong>Project note</strong>
                    <br />
                    This demonstration stores information in
                    React state and resets after a refresh.
                  </p>
                </div>
              </>
            )}

            {page === "profile" && (
              <div className="panel profile-panel">
                <div className="profile-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : "G"}
                </div>
                <h2>{user.name || "Guest Voter"}</h2>
                <p className="muted">
                  {user.email || "No registered email"}
                </p>

                <div className="profile-details">
                  <div>
                    <span>Registration status</span>
                    <strong>{registered ? "Registered (demo)" : "Not registered"}</strong>
                  </div>
                  <div>
                    <span>Voting status</span>
                    <strong>{hasVoted ? "Vote submitted" : "Awaiting vote"}</strong>
                  </div>
                  <div>
                    <span>Election</span>
                    <strong>Classroom Election 2026</strong>
                  </div>
                  <div>
                    <span>Account type</span>
                    <strong>Academic proto
