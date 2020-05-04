<template>
    <div class="main_container">
        <h1>Login to Existing account</h1>
        <div class="login_container">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                        id="input-group-1"
                        label="Username"
                        label-for="input-1"
                        description="We'll never share your email with anyone else."
                >
                    <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                    <b-form-input
                            id="input-2"
                            v-model="form.password"
                            required
                            type="password"
                            placeholder="Enter your password"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" style="margin-right: 20px" variant="primary">Submit</b-button>
                <b-button type="reset" style="margin-left: 20px" variant="danger">Reset</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        props: {},
        data: () => {
            return {
                form: {
                    email: "",
                    password: ""
                },
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onReset(evt) {
                evt.preventDefault()
                this.form.email = ''
                this.form.password = ''
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style scoped>
    .main_container {
        height: 100vh;
        width: 100%;
    }

    .login_container {
        margin-left: 40%;
        width: 19%;
        height: 60vh;
        margin-top: 20vh;
    }
</style>
