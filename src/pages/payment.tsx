import { MercadoPagoButton } from "../components/MercadoPagoButton";
import { PlanBasico, PlanPremium } from "../components/Plan/Plan";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProtectedRoute from '../components/ProtectedRoute'
import HomeLayout from '../components/HomeLayout/HomeLayout'
import {
    Section,
    Title
} from '../styles/Suscriptions.styles'
import { useRouter } from 'next/router';

import styles from "../styles/Home.module.scss";

interface NotificationType {
    isOpen: boolean;
    type: "approved" | "failure" | null;
    content: string;
}

export default function Home() {

    const router = useRouter();
    const queryParam = router.query.plan as string;

    const plans = {
        "basic": PlanBasico,
        "premium": PlanPremium
    }

    const selectedPlan = plans[queryParam]

    const [notification, setNotification] = useState<NotificationType>({
        isOpen: false,
        type: null,
        content: "",
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status");

        if (status === "approved") {
            setNotification({
                content: "Pago aprobado!",
                isOpen: true,
                type: "approved",
            });
        } else if (status === "failure") {
            setNotification({
                content: "Pago fallido!",
                isOpen: true,
                type: "failure",
            });
        }

        setTimeout(() => {
            setNotification({
                isOpen: false,
                type: null,
                content: "",
            });
        }, 5000);
    }, []);

    return (
        <ProtectedRoute>
            <HomeLayout activePage='/admin/subscriptions'>
                <Section>
                    <Title>Administrar Suscripciones</Title>

                    <div className={styles.productContainer}>
                        <Image
                            src={selectedPlan.img}
                            alt={selectedPlan.title}
                            width={300}
                            height={400}
                            priority
                        />

                        <div className={styles.data}>
                            <div className={styles.top}>
                                <h2>{selectedPlan.title}</h2>
                                <h3>{'$' + selectedPlan.price}</h3>
                            </div>
                            <div className={styles.center}>
                                <span>Lo que tenes que saber de este plan:</span>

                                <ul>
                                    {selectedPlan.description.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <MercadoPagoButton product={selectedPlan} />
                            </div>
                        </div>
                    </div>

                    {notification.isOpen && (
                        <div className={styles.notification}>
                            <div
                                className={styles.iconContainer}
                                style={{
                                    backgroundColor:
                                        notification.type === "approved" ? "#00cc99" : "#ee4646",
                                }}
                            >
                                <Image
                                    src={`/assets/${notification.type}.svg`}
                                    alt={notification.type!}
                                    width={25}
                                    height={25}
                                />
                            </div>

                            <p>{notification.content}</p>
                        </div>
                    )}

                </Section>
            </HomeLayout>
        </ProtectedRoute>

    );
}