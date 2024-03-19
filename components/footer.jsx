import Link from "next/link";
import { Container, FlexContainer } from "@pantheon-systems/pds-toolkit-react";

export default function Footer({ children }) {
  return (
    <footer>
      <Container
        width="standard"
        className="pds-spacing-pad-block-start-4xl pds-spacing-pad-block-end-2xl"
      >
        <FlexContainer>{children}</FlexContainer>
      </Container>
    </footer>
  );
}
