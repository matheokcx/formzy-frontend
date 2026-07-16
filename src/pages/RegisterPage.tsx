import RegisterForm from '@/components/UI/Auth/RegisterForm/RegisterForm.tsx';

const RegisterPage = () => {
    return (
        <main
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <RegisterForm />
        </main>
    );
};

export default RegisterPage;
