import { DocusealForm } from "@docuseal/react";
import React from "react";
import { createPage } from "../../utils";

const Signature = createPage("/signature", () => (
  <div className="blocks-layout-lg">
    <DocusealForm
      email="signer@example.com"
      src="https://docuseal.co/d/jrJKKG9T8NKhGo"
    />
  </div>
));

export default Signature;
