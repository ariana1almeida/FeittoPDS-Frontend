import React from "react";
import styled from "styled-components";

const StyledH1 = styled.h1`
    font-family: 'Arimo', sans-serif;
    font-weight: 400;
    font-size: 36px;
`;

type H1Props = {
    children: React.ReactNode;
    className?: string;
};

export default function H1({ children, className }: H1Props) {
    return <StyledH1 className={className}>{children}</StyledH1>;
}