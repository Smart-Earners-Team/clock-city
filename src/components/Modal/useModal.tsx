import React, { useState, useCallback } from 'react';
import { MintPoolItem } from '../Mint/mintPool';

interface ModalProps {
    className: string | undefined;
    isOpen: boolean;
    onClose: () => void;
    id: number | null;
    pool: MintPoolItem[];
    children: (item: MintPoolItem) => React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, className, id, pool, children }) => {
    if (!isOpen) {
        return null;
    }

    const item = pool.find(value => value.id === id);

    if (!item) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className={`bg-white p-5 rounded-lg max-w-lg w-full ${className}`} onClick={e => e.stopPropagation()}>
                {children(item)}
            </div>
        </div>
    );
};

const useModal = (initialIsOpen: boolean = false, pool: MintPoolItem[] = []) => {
    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const [id, setId] = useState<number | null>(null);

    const ModalComponent: React.FC<{
        className: string | undefined, children: any;
    }> = ({ className, children }) => (
        <Modal className={`${className}`} isOpen={isOpen} onClose={() => setIsOpen(false)} id={id} pool={pool}>
            {children}
        </Modal>
    );

    const openModal = useCallback((id: number) => {
        setIsOpen(true);
        setId(id);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setId(null);
    }, []);

    return { ModalComponent, openModal, closeModal };
};

export default useModal;
