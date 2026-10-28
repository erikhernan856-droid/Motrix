import type { ComponentType, ImgHTMLAttributes } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';

const AppLogoIconComponent = AppLogoIcon as ComponentType<ImgHTMLAttributes<HTMLImageElement>>;

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-20 items-center justify-center rounded-md">
                <AppLogoIconComponent className="size-17 object_contain" />
            </div>
            <div className="ml-3 grid flex-1 text-left text-sm">
                <span className="mb-1 truncate leading-tight font-semibold">
                    Motrix
                </span>
            </div>
        </>
    );
}
