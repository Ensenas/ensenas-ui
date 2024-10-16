import styles from './styles.module.scss'

export const Loader = ({ size = 20 }: { size?: number }) => {
    return (
        <div style={{ width: size, height: size }} className={styles.spinner} />
    )
}