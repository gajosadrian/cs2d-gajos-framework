type Binding<T> = {
    singleton: boolean;
    factory: () => T;
    instance?: T;
};

export class ServiceContainer<TServices extends Record<string, any>> {
    private bindings: Map<keyof TServices, Binding<unknown>> = new Map();

    bind<K extends keyof TServices>(
        name: K,
        factory: () => TServices[K],
        singleton: boolean = false,
    ): void {
        this.bindings.set(name, { singleton, factory });
    }

    singleton<K extends keyof TServices>(name: K, factory: () => TServices[K]): void {
        this.bind(name, factory, true);
    }

    resolve<K extends keyof TServices>(name: K): TServices[K] {
        const binding = this.bindings.get(name);

        if (!binding) {
            throw new Error(`Service '${String(name)}' is not bound.`);
        }

        if (binding.singleton) {
            if (!binding.instance) {
                binding.instance = binding.factory();
            }
            return binding.instance as TServices[K];
        }

        return binding.factory() as TServices[K];
    }
}
