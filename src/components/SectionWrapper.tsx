import React from 'react';

interface SectionWrapperProps {
    title?: string;
    action?: any;
    actionTitle?: any;
    icon?: any;
    children?: React.ReactNode;
    useContainer?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
    title = 'Title',
    action,
    actionTitle,
    icon,
    children,
    useContainer,
}) => {
    return (
        <section className="section-wrapper">
            <div className="head">
                <h2 className="title">{title}</h2>
                {action !== undefined && icon !== undefined && (
                    <button className="button" onClick={action}>
                        {icon} {actionTitle}
                    </button>
                )}
            </div>
            {useContainer ?
                <div className="container">{children}</div>
                :
                <div>{children}</div>}
        </section>
    );
};

export default SectionWrapper;
