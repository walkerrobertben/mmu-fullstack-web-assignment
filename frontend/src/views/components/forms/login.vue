<template>
    <n-form :show-label="false">
        <n-form-item>
            <n-input type="email" placeholder="email@domain.com"/>
        </n-form-item>
        <n-form-item>
            <n-input type="password" placeholder="Password"/>
        </n-form-item>
        <n-space justify="center">
            <n-button type="Primary">Login</n-button>
        </n-space>
    </n-form>
</template>