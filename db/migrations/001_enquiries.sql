-- Messages sent through the contact form.
CREATE TABLE enquiries (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT NOT NULL DEFAULT '',
  sector      TEXT NOT NULL DEFAULT '',
  message     TEXT NOT NULL,
  -- Set when someone on the team has dealt with it.
  handled_at  TIMESTAMPTZ
);

CREATE INDEX enquiries_created_at_idx ON enquiries (created_at DESC);
