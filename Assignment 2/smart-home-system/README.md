# Assignment 2 – Smart Home System

## Overview
This assignment builds a TypeScript smart home controller that demonstrates SOLID design and multiple design patterns. The console-driven hub manages lights, thermostats, and door locks while showcasing factory creation, proxy enforcement, and observer-based automation.

## Feature highlights
- **Interactive CLI:** `main.ts` exposes commands such as `turnOn`, `turnOff`, `setTemp`, and `status` so users can drive devices manually.
- **Automation triggers:** `TriggerManager` observes the hub and can run condition-based rules (for example, shutting off a light when the thermostat reports a high temperature).
- **Scheduling:** `Scheduler` queues future actions that are checked on each loop iteration.
- **Device management:** `SmartHomeHub` keeps a registry of devices, notifies observers about state changes, and prints formatted status reports.

## Pattern usage
| Pattern | Location | Purpose |
| --- | --- | --- |
| Factory | `src/patterns/factory/DeviceFactory.ts` | Builds device instances (`Light`, `Thermostat`, `DoorLock`) using a single entry point |
| Proxy | `src/patterns/proxy/DeviceAccessProxy.ts` | Wraps devices to centralize logging and interception logic |
| Observer | `src/core/SmartHomeHub.ts`, `src/core/TriggerManager.ts` | Hub acts as subject and notifies observers whenever device state changes |

## Project structure
```
Assignment 2/
├── README.md
├── package.json
├── tsconfig.json
└── smart-home-system/
    └── src/
        ├── core/           # Hub, scheduler, trigger manager
        ├── devices/        # Light, Thermostat, DoorLock implementations
        ├── interfaces/     # Core contracts (ISmartDevice, IObserver, ISubject)
        ├── patterns/       # Factory and proxy patterns
        ├── utils/          # Logger and command parser helpers
        └── main.ts         # Entry point with interactive loop
```

## Prerequisites
- Node.js 18+
- npm (bundled with Node)

Install local dependencies (only `@types/node` right now):

```powershell
cd "Assignment 2/smart-home-system"
npm install
```

## Running the demo
1. **Compile TypeScript**
   ```powershell
   npx tsc
   ```
2. **Start the interactive hub**
   ```powershell
   node dist/main.js
   ```

During the session you can run commands such as:
- `status`
- `turnOn 1`
- `turnOff 1`
- `setTemp 2 78`
- `add light 4`
- `help`
- `exit`

## Notes
- The scheduler check is simulated inside the CLI loop; real deployments would use timers.
- Add new devices by extending `ISmartDevice` and registering them through `SmartHomeHub.addDevice`.
