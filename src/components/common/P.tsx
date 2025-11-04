import React from "react";
import styled from "styled-components";

const StyledP = styled.p`
    font-family: 'Arimo', sans-serif;
    font-weight: 400;
    font-size: 16px;
`;

type PProps = {
    children: React.ReactNode;
    className?: string;
};

export default function P({ children, className }: PProps) {
    return <StyledP className={className}>{children}</StyledP>;
}