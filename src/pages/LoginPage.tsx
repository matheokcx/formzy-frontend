import LoginForm from '@/components/UI/Auth/LoginForm/LoginForm.tsx';

const LoginPage = () => {
    return (
        <main
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <LoginForm />
        </main>
    );
};

export default LoginPage;
