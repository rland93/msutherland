---
title: "Weekly Development Blog - BLDC Motor Control Project - Dec 20, 2025 Devlog"
date: 2024-12-21
tags: ["devlog"]
draft: True
author: Mike Sutherland
series: "weekly devlogs"
---

I'm building a motor controller!

So, I'm going to hack on a 2 wheeled, balancing robot. In order to do this, I need to have motors that can move. I want this to be a bit more "pro" than the off-the-shelf kits out there. Not that those kits are bad, I just want to do a little more myself.

# Weekly Development Blog - BLDC Motor Control Project

## Week Ending December 20, 2024

### Project Overview

- Developing a custom brushless DC motor controller for a balancing robot
- Goal: Deep understanding of Field-Oriented Control (FOC) implementation
- Target: Complete PCB design by end of January 2025

### Hardware Design Progress

#### Motor Controller Selection

- Decided on TI integrated BLDC motor driver chips
  - Cost-effective at ~$2.50 per unit
  - Includes built-in MOSFETs and control circuitry
  - Specifications: 10-40V input, 2A RMS / 8A peak output
  - Good availability (900 units in stock at JLCPCB)
  - Simplified design compared to discrete component approach
  - Built-in buck converter for system power

#### Microcontroller Selection

- Chosen MCU: STM32G431
- Key features for motor control:
  - CORDIC acceleration for FOC calculations
  - Dedicated motor control timers
  - Sufficient pins for encoders, ADCs, and PWM
  - Cost-effective package selection

#### PCB Design Considerations

- Current challenges:
  - Managing multiple power domains (3.3V VCC, 3V reference, motor power)
  - ADC signal integrity for current sensing
  - Analog noise management
  - High-current routing and thermal management
- Planning to reference TI's example layouts for motor driver integration
- Estimated BOM cost: ~$15/unit at JLCPCB
  - 5-6 extended parts (~$10)
  - Remainder using standard parts

### Software Architecture Decisions

#### Language Selection Debate

- Considering both Rust and C implementations
- Rust advantages:
  - Better for high-level control
  - Strong serialization support
  - Modern dependency management
- C advantages:
  - Easier timer setup with STM32Cube
  - Better low-level hardware control
- Potential hybrid approach:
  - C for low-level motor control
  - Rust for higher-level functions

#### FOC Implementation

- Exploring existing solutions:
  - SimpleFOC (Arduino library)
  - Available Rust libraries
- Leaning towards custom implementation for:
  - Better understanding of FOC
  - More control over optimization
  - Avoiding Arduino ecosystem lock-in

### Next Steps

1. Complete schematic design (target: during upcoming flight)
2. Begin PCB layout
3. Focus on analog signal integrity
4. Finalize language choice
5. Order components before potential tariff changes

### Timeline

- Next week: Limited progress due to holidays
- Planning intensive work during 15-hour flight
- Target: PCB design completion by end of January
- Goal: Boards in hand by early 2025

### Project Risks

1. Analog signal integrity
2. High-current design considerations
3. Potential supply chain disruptions
4. Cost increases due to potential tariff changes

*Note: This development blog is part of an ongoing series documenting the creation of a custom BLDC motor controller for robotics applications.*
