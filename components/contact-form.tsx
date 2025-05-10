"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="alpin..."
          required
          className="bg-background/50 border-muted-foreground/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          className="bg-background/50 border-muted-foreground/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="tell me about something good..."
          rows={5}
          required
          className="bg-background/50 border-muted-foreground/20"
        />
      </div>

      <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center">
            <motion.div
              className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </Button>
    </motion.form>
  )
}
