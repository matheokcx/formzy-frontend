import { type DragEvent, type PointerEvent, useRef, useState } from 'react';
import styles from './draggable-field.module.css';
import { useTranslation } from 'react-i18next';
import type { FieldType } from '@/utils.tsx';

export const PICKABLE_FIELD_FORMAT = 'application/formzy-field'; // MIME type custom

type PickableFieldProps = {
    field: FieldType;
};

const DraggableField = ({ field }: PickableFieldProps) => {
    const { t } = useTranslation();
    type Position = {
        x: number;
        y: number;
    };
    const pointerOrigin = useRef<Position | null>(null);
    const hoveredElement = useRef<Element | null>(null);

    const [futurePosition, setFuturePosition] = useState<Position | null>(null);

    const handleDragStart = (event: DragEvent<HTMLDivElement>): void => {
        event.dataTransfer.setData(
            PICKABLE_FIELD_FORMAT,
            JSON.stringify({ label: t(field.text), type: field.type }),
        );
        event.dataTransfer.effectAllowed = 'copy';
    };

    const forwardDragEvent = (
        target: Element | null,
        type: 'dragover' | 'dragleave' | 'drop',
        { x, y }: Position,
    ): void => {
        const dataTransfer: DataTransfer = new DataTransfer();
        dataTransfer.setData(
            PICKABLE_FIELD_FORMAT,
            JSON.stringify({ label: t(field.text), type: field.type }),
        );
        dataTransfer.effectAllowed = 'copy';

        target?.dispatchEvent(
            new DragEvent(type, {
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y,
                dataTransfer: dataTransfer,
            }),
        );
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
        if (event.pointerType === 'mouse') {
            return;
        }

        event.currentTarget.setPointerCapture(event.pointerId);
        pointerOrigin.current = { x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
        if (!pointerOrigin.current) {
            return;
        }

        const position: Position = { x: event.clientX, y: event.clientY };
        const distance: number = Math.hypot(
            position.x - pointerOrigin.current.x,
            position.y - pointerOrigin.current.y,
        );

        if (!futurePosition && distance < 0) {
            return;
        }

        setFuturePosition(position);

        const target: Element | null = document.elementFromPoint(position.x, position.y);

        if (hoveredElement.current && hoveredElement.current !== target) {
            forwardDragEvent(hoveredElement.current, 'dragleave', position);
        }

        hoveredElement.current = target;
        forwardDragEvent(target, 'dragover', position);
    };

    const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
        if (futurePosition) {
            const position: Position = { x: event.clientX, y: event.clientY };

            forwardDragEvent(document.elementFromPoint(position.x, position.y), 'drop', position);
            forwardDragEvent(hoveredElement.current, 'dragleave', position);
        }

        pointerOrigin.current = null;
        hoveredElement.current = null;
        setFuturePosition(null);
    };

    return (
        <>
            <div
                className={styles.field}
                draggable
                onDragStart={handleDragStart}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                {field.icon}
                <p>{t(field.text)}</p>
            </div>

            {futurePosition && (
                <div
                    className={`${styles.field} ${styles.ghost}`}
                    style={{ left: futurePosition.x, top: futurePosition.y }}
                >
                    {field.icon}
                    <p>{t(field.text)}</p>
                </div>
            )}
        </>
    );
};

export default DraggableField;
