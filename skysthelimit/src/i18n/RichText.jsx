import { Trans } from "react-i18next";

/**
 * Translated text that contains <b>bold</b> or <i>italic</i> parts.
 * `b` / `i` are the classes used for those parts.
 */
export default function RichText({ k, values, b = "font-semibold", i = "italic" }) {
  return (
    <Trans
      i18nKey={k}
      values={values}
      components={{ b: <span className={b} />, i: <span className={i} /> }}
    />
  );
}
