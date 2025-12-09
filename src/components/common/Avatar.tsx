import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {cn} from "./utils";

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
    image?: string;
    alt?: string;
    fallbackText?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function Avatar({className, image, alt = "", fallbackText = "", size = 'md', ...props}: AvatarProps) {
    const sizeClasses = {
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12'
    };

    return (
        <AvatarPrimitive.Root
            data-slot="avatar"
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full",
                sizeClasses[size],
                className,
            )}
            {...props}
        >
            {image && (
                <AvatarPrimitive.Image
                    src={image}
                    alt={alt}
                    className="aspect-square size-full object-cover rounded-full"
                />
            )}
            <AvatarPrimitive.Fallback
                className="bg-accent-green text-white flex size-full items-center justify-center rounded-full font-semibold"
            >
                {fallbackText?.charAt(0)?.toUpperCase() || '?'}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
}
